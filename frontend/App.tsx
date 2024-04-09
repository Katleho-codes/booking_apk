import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import React from 'react';
import { SafeAreaView } from 'react-native';
import 'react-native-url-polyfill/auto';
// import { styles } from "./components/Button/style";
import { NavigationContainer } from "@react-navigation/native";
import Stacks from "./components/Stacks";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });


  if (fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stacks />
        </NavigationContainer>


      </SafeAreaView>

    );
  }
}

