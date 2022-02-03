import { StatusBar } from 'expo-status-bar';
import Routes from './src/routes';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

export default function App() {
    //fontes utilizadas no projeto
    let [fontsLoaded] = useFonts({
      Nunito_600SemiBold,
      Nunito_700Bold,
      Nunito_800ExtraBold
  })

  if(!fontsLoaded){
    //carrega a tela de loading enquanto a fontes não forem carregadas
    return <AppLoading />
  }else{
    return (
      <>     
        <Routes/>
      </>
    );
  }
}