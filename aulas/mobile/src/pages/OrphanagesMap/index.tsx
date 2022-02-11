import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import api from "../../services/api";

import styles from './styles';
import mapMarker from '../../images/map-marker.png';

interface Orphanage{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}


export type RootStackParamList = {
    OrphanageDetails: {
        orphanage_id: number;
    };

    SelectMapPosition: undefined;
};

type NavigateProp = NativeStackNavigationProp<
  RootStackParamList
>;

const Routes = () => {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const { navigate } = useNavigation<NavigateProp>();

    function handleNavigateToOrphanageDetails(id: number){
        navigate('OrphanageDetails', {
            orphanage_id: id
        });
    }

    function handleNavigateToCreateOrphanage(){
        navigate('SelectMapPosition');
    }

    useEffect(() => {
        async function handleOrphanages(){
            await api.get('orphanages')
            .then((response) => {
                setOrphanages(response.data);
            }).catch((err) => {
                alert(err.error);
            });
        }

        handleOrphanages();
    }, []);

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
        <>
            <View style={styles.container}>

                {initialPosition[0] ?
                    <MapView 
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: initialPosition[0], 
                            longitude: initialPosition[1],
                            latitudeDelta: 0.008,
                            longitudeDelta: 0.008
                        }}
                        >

                        {
                            orphanages.map(orphanage => (
                                <Marker 
                                    icon={mapMarker}
                                    key={orphanage.id}
                                    calloutAnchor={{
                                        x: 2.7,
                                        y: 0.8
                                    }}
                                    coordinate={{
                                        latitude: orphanage.latitude, 
                                        longitude: orphanage.longitude,
                                    }}
                                >
                                    <Callout tooltip={true} onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                                        <View style={styles.calloutContainer}>
                                            <Text style={styles.calloutText}>{orphanage.name}</Text>
                                        </View>
                                    </Callout>
                                </Marker>
                            ))
                        }
                    </MapView>
                : null}


                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        {orphanages.length} orfanatos encontrados
                    </Text>

                    <TouchableOpacity style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
                        <Feather name="plus" size={20} color='#FFF'/>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

export default Routes;