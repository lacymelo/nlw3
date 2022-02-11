import React, { useEffect,  useState } from 'react';
import { ScrollView, View, Switch, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import api from '../../../services/api';


interface Params{
  position: {
    latitude: number;
    longitude: number;
  }
}

export type RootStackParamList = {
  OrphanagesMap: undefined;
}

type NavigateProp = NativeStackNavigationProp<RootStackParamList>;

const OrphanageData = () => {
  const route = useRoute();
  const routeParams = route.params as Params
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const { navigate } = useNavigation<NavigateProp>();

  async function handleSubmit() {
    const {latitude, longitude} = routeParams.position;
    const dataForm = new FormData();

    dataForm.append("name", name);
    dataForm.append("latitude", String(latitude));
    dataForm.append("longitude", String(longitude));
    dataForm.append("about", about);
    dataForm.append("instructions", instructions);
    dataForm.append("opening_hours", opening_hours);
    dataForm.append("open_on_weekends", String(open_on_weekends));


    images.forEach((image, index) => {
        dataForm.append('images', {
          type: 'image/jpg',
          uri: image,
          filename: `${index}-image.jpg`,
        } as any);
    })


    console.log(dataForm);

    await api.post('orphanages', dataForm)
    .then(() => {
        alert('Cadastro realizado com sucesso!');
        navigate('OrphanagesMap');
    }).catch((err) => {
        alert(err);
    });  
  }

  async function handleSelectImages(){
    const {status} = await ImagePicker.requestCameraPermissionsAsync();

    if(status !== 'granted'){
      alert('Ops, precisamos de acesso às suas fotos ...');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, //para editar a imagem antes de fazer upload dela
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // serão aceitos somente imagens e não vídeos
    });

    if(result.cancelled){
      return;
    }

    let { uri: image } = result;

    setImages([...images, image]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={setAbout}
      />

      {/* <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
      /> */}

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        {images.map((image, index) => (
            <Image
              source={{ uri: image }}
              key={index}
              style={styles.uploadedImage}
            />
        ))
        }
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={setOpeningHours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
        />
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default OrphanageData;