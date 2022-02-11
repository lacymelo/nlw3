import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MapView, { Marker, MapEvent } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

import mapMarkerImg from '../../../images/map-marker.png';

import styles from './styles';

export type RootStackParamList = {
    OrphanageData: {
      position: {
        latitude: number;
        longitude: number;
      }
    };
};

type NavigateProp = NativeStackNavigationProp<
  RootStackParamList
>;

export default function SelectMapPosition() {
  const navigation = useNavigation<NavigateProp>();
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  function handleNextStep() {
    navigation.navigate('OrphanageData', {position});
  }

  function handleSelectMapPosition(event: MapEvent){
    setPosition(event.nativeEvent.coordinate);
  }

  useEffect(() => {
      async function loadPosition() {
          const { status } = await requestForegroundPermissionsAsync();

          if(status !== 'granted'){
              Alert.alert('Oooops...', 'Precisamos de sua permissão para obter a localização');
              return;
          }else{
              const location = await getCurrentPositionAsync({});

              const { latitude, longitude } = location.coords;

              setInitialPosition([latitude, longitude]);
          }
      }

      loadPosition();
  }, []);

  return (
    <View style={styles.container}>

    {initialPosition[0] ?
      <MapView 
        initialRegion={{
          latitude: initialPosition[0],
          longitude: initialPosition[1],
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        <Marker 
          icon={mapMarkerImg}
          coordinate={{ latitude: position.latitude, longitude: position.longitude }}
        />
      </MapView>
    : null}


      {
        position.latitude !== 0 && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
            <Text style={styles.nextButtonText}>Próximo</Text>
          </TouchableOpacity>
        )
      }
    </View>
  )
}