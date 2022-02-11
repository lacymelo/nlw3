import React from "react";
import { View, Text, TouchableOpacity} from "react-native";
import { Feather, AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import styles from "./styles";

interface HeaderProps{
    title: string;
    showCancel?: boolean;
}

export type RootStackParamList = {
    OrphanagesMap: undefined;
};

type NavigateProp = NativeStackNavigationProp<
  RootStackParamList
>;

const Header: React.FC<HeaderProps> = ({ title, showCancel = false }) => {
    const navigation = useNavigation<NavigateProp>();

    function handleGoBackToAppHomepage(){
        navigation.navigate('OrphanagesMap');
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Feather name="arrow-left" size={24} color="#15b5d6"/>
                </TouchableOpacity>

                <Text style={styles.title}>
                    {title}
                </Text>

                {showCancel && (
                    <TouchableOpacity onPress={handleGoBackToAppHomepage}>
                        <AntDesign name="close" size={24} color="#ff669d"/>
                    </TouchableOpacity>
                )}
            </View>
        </>
    );
}

export default Header;