import React, { useEffect, useState } from 'react';
import { Image, View, ScrollView, Text, TouchableOpacity, Linking} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import api from '../../services/api';

import styles from './styles';
import mapMarkerImg from '../../images/map-marker.png';

interface Params {
  orphanage_id: number
}

interface OrphanageType{
  name: string,
  latitude: number,
  longitude: number,
  about: string,
  instructions: string,
  opening_hours: string,
  open_on_weekends: boolean,
  images: Array<{
    id: number;
    url: string;
  }>
}

const OrphanageDetails = () => {
  const route = useRoute();
  const routeParams = route.params as Params;
  const [orphanage, setOrphanage] = useState<OrphanageType>();

  useEffect(() => {
    api.get(`/orphanages/${routeParams.orphanage_id}`)
    .then((response) => {
       setOrphanage(response.data);
    }).catch((err) => {
       alert(err.error);
    });
  }, [routeParams.orphanage_id]);

  function handleOpenGoogleMapRoutes(){
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${Number(orphanage?.latitude)},${Number(orphanage?.longitude)}`);
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.imagesContainer}>
          <ScrollView horizontal pagingEnabled>
            {
              orphanage?.images.map((image) => (
                <Image 
                  key={image.id}
                  style={styles.image}
                  source={{ uri: image.url }} />
              ))
            }
          </ScrollView>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{orphanage?.name}</Text>
          <Text style={styles.description}>{orphanage?.about}</Text>
        
          <View style={styles.mapContainer}>
          {orphanage?.latitude ? 
            <MapView 
              initialRegion={{
                latitude: Number (orphanage?.latitude),
                longitude: Number (orphanage?.longitude),
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
              }} 
              zoomEnabled={false}
              pitchEnabled={false}
              scrollEnabled={false}
              rotateEnabled={false}
              style={styles.mapStyle}
            >
              <Marker 
                icon={mapMarkerImg}
                coordinate={{ 
                  latitude: Number (orphanage?.latitude),
                  longitude: Number (orphanage?.longitude)
                }}
              />
            </MapView>
          : null}

            <TouchableOpacity
              style={styles.routesContainer}
              onPress={handleOpenGoogleMapRoutes}
              >
              <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
            </TouchableOpacity>
          </View>
        
          <View style={styles.separator} />

          <Text style={styles.title}>Instruções para visita</Text>
          <Text style={styles.description}>{orphanage?.instructions}</Text>

          <View style={styles.scheduleContainer}>
            <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
              <Feather name="clock" size={40} color="#2AB5D1" />
              <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>Segunda à Sexta {orphanage?.opening_hours}</Text>
            </View>

            {
              orphanage?.open_on_weekends ? (
                <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
                  <Feather name="info" size={40} color="#39CC83" />
                  <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Atendemos fim de semana</Text>
                </View>
              ) : (
                <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
                  <Feather name="info" size={40} color="#FF669d" />
                  <Text style={[styles.scheduleText, styles.scheduleTextRed]}>Não atendemos fim de semana</Text>
                </View>
              )
            }

          </View>

          {/* <TouchableOpacity style={styles.contactButton} onPress={() => {}}>
            <FontAwesome name="whatsapp" size={24} color="#FFF" />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </>
  )
}

export default OrphanageDetails;