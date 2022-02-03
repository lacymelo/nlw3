import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

//importação das telas
import OrphanagesMap from "./pages/OrphanagesMap";
import OrphanageDetails from "./pages/OrphanageDetails";

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="OrphanagesMap" component={OrphanagesMap}/>
                <Stack.Screen name="OrphanageDetails" component={OrphanageDetails}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;