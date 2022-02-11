import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

//componentes
import Header from "./components/Header/Header";

//importação das telas
import OrphanagesMap from "./pages/OrphanagesMap";
import OrphanageDetails from "./pages/OrphanageDetails";
import OrphanageData from "./pages/CreateOrphanage/OrphanageData";
import SelectMapPosition from "./pages/CreateOrphanage/SelectMapPosition";

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    headerStyle: { backgroundColor: '#f2f3f5' }
                }}
            >
                <Stack.Screen
                    name="OrphanagesMap"
                    component={OrphanagesMap}
                />

                <Stack.Screen
                    name="OrphanageDetails"
                    component={OrphanageDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={true} title="Orfanato" />
                    }}
                />

                <Stack.Screen
                    name="OrphanageData"
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={true} title="Informe os dados" />
                    }}
                />

                <Stack.Screen
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={true} title="Selecione no mapa" />
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;