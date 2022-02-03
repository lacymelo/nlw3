import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import styles from './styles';
import mapMarker from '../../images/map-marker.png';

export type RootStackParamList = {
    OrphanageDetails: undefined;
};

type NavigateProp = NativeStackNavigationProp<
  RootStackParamList
>;

const Routes = () => {
    const { navigate } = useNavigation<NavigateProp>();

    function handleNavigateToOrphanageDetails(){
        navigate('OrphanageDetails');
    }
    
    return (
        <>
            <View style={styles.container}>
                <MapView 
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: -2.236965, 
                        longitude: -49.502283,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.008
                    }}
                    >
                        <Marker 
                            icon={mapMarker}
                            calloutAnchor={{
                                x: 2.7,
                                y: 0.8
                            }}
                            coordinate={{
                                latitude: -2.236965, 
                                longitude: -49.502283,
                            }}
                        >
                            <Callout tooltip={true} onPress={handleNavigateToOrphanageDetails}>
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutText}>Lar dos Meninos</Text>
                                </View>
                            </Callout>
                        </Marker>
                    </MapView>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            2 orfanatos encontrados
                        </Text>

                        <TouchableOpacity style={styles.createOrphanageButton} onPress={() => {}}>
                            <Feather name="plus" size={20} color='#FFF'/>
                        </TouchableOpacity>
                    </View>
            </View>
        </>
    );
}

export default Routes;