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
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import 'react-native-url-polyfill/auto';
// import { styles } from "./components/Button/style";
import { Dropdown } from "react-native-element-dropdown";
import { styles } from "./screens/BookingForm/style";
import { Colors } from "./utils/colors";
import { HHPSymptom1, HHPSymptom2A, HHPSymptom2B, HHPSymptom2C, HHPSymptom2D, HHPSymptom2E, HHPSymptom2F, HHPSymptom2G, HHPSymptom2H, HHPSymptom2I, HHPSymptom2J, HHPSymptom2K, HHPSymptom2L, HHPSymptom2M, HHPSymptom2N, HHPSymptom2O, HHPSymptom2P, HHPSymptom2Q, HHPSymptom3A, HHPSymptom3AA, HHPSymptom3AB, HHPSymptom3AC, HHPSymptom3AD, HHPSymptom3AE, HHPSymptom3AF, HHPSymptom3AG, HHPSymptom3AH, HHPSymptom3AI, HHPSymptom3AJ, HHPSymptom3AK, HHPSymptom3AL, HHPSymptom3AM, HHPSymptom3AN, HHPSymptom3AO, HHPSymptom3AP, HHPSymptom3AQ, HHPSymptom3AR, HHPSymptom3AS, HHPSymptom3AT, HHPSymptom3AU, HHPSymptom3AV, HHPSymptom3AW, HHPSymptom3AX, HHPSymptom3AY, HHPSymptom3AZ, HHPSymptom3B, HHPSymptom3BA, HHPSymptom3BB, HHPSymptom3BC, HHPSymptom3BD, HHPSymptom3BF, HHPSymptom3BG, HHPSymptom3BH, HHPSymptom3BI, HHPSymptom3BJ, HHPSymptom3BK, HHPSymptom3BL, HHPSymptom3BM, HHPSymptom3BN, HHPSymptom3BO, HHPSymptom3BP, HHPSymptom3BQ, HHPSymptom3C, HHPSymptom3CA, HHPSymptom3CB, HHPSymptom3CC, HHPSymptom3CD, HHPSymptom3CE, HHPSymptom3CF, HHPSymptom3CG, HHPSymptom3CH, HHPSymptom3CI, HHPSymptom3CJ, HHPSymptom3CK, HHPSymptom3CL, HHPSymptom3CM, HHPSymptom3CN, HHPSymptom3CO, HHPSymptom3CP, HHPSymptom3CQ, HHPSymptom3CR, HHPSymptom3CS, HHPSymptom3CT, HHPSymptom3CU, HHPSymptom3CV, HHPSymptom3CW, HHPSymptom3CX, HHPSymptom3CY, HHPSymptom3D, HHPSymptom3DA, HHPSymptom3DB, HHPSymptom3DC, HHPSymptom3DD, HHPSymptom3DE, HHPSymptom3DF, HHPSymptom3DH, HHPSymptom3DI, HHPSymptom3DJ, HHPSymptom3DK, HHPSymptom3DL, HHPSymptom3DM, HHPSymptom3DN, HHPSymptom3DO, HHPSymptom3DP, HHPSymptom3DQ, HHPSymptom3DR, HHPSymptom3DS, HHPSymptom3DT, HHPSymptom3DU, HHPSymptom3DV, HHPSymptom3DW, HHPSymptom3DX, HHPSymptom3DY, HHPSymptom3DZ, HHPSymptom3E, HHPSymptom3EA, HHPSymptom3EB, HHPSymptom3EC, HHPSymptom3ED, HHPSymptom3EE, HHPSymptom3EF, HHPSymptom3EG, HHPSymptom3EH, HHPSymptom3EI, HHPSymptom3EJ, HHPSymptom3EK, HHPSymptom3EL, HHPSymptom3EM, HHPSymptom3EN, HHPSymptom3EO, HHPSymptom3EP, HHPSymptom3EQ, HHPSymptom3ER, HHPSymptom3ES, HHPSymptom3ET, HHPSymptom3EU, HHPSymptom3EV, HHPSymptom3EW, HHPSymptom3EX, HHPSymptom3EY, HHPSymptom3EZ, HHPSymptom3F, HHPSymptom3FA, HHPSymptom3FB, HHPSymptom3FC, HHPSymptom3FD, HHPSymptom3FE, HHPSymptom3FF, HHPSymptom3FG, HHPSymptom3FH, HHPSymptom3FI, HHPSymptom3FJ, HHPSymptom3FK, HHPSymptom3FL, HHPSymptom3FM, HHPSymptom3FN, HHPSymptom3FO, HHPSymptom3FP, HHPSymptom3FR, HHPSymptom3FS, HHPSymptom3FT, HHPSymptom3FU, HHPSymptom3FV, HHPSymptom3FW, HHPSymptom3FX, HHPSymptom3FY, HHPSymptom3FZ, HHPSymptom3G, HHPSymptom3GA, HHPSymptom3GB, HHPSymptom3GC, HHPSymptom3GD, HHPSymptom3GE, HHPSymptom3GF, HHPSymptom3GG, HHPSymptom3GH, HHPSymptom3H, HHPSymptom3I, HHPSymptom3J, HHPSymptom3K, HHPSymptom3L, HHPSymptom3M, HHPSymptom3N, HHPSymptom3O, HHPSymptom3P, HHPSymptom3Q, HHPSymptom3R, HHPSymptom3S, HHPSymptom3T, HHPSymptom3U, HHPSymptom3V, HHPSymptom3W, HHPSymptom3X, HHPSymptom3Y, HHPSymptom3Z, HHPSymptom3Z_ } from "./utils/gspnDropdowns";
import Stacks from "./components/Stacks";
import { NavigationContainer } from "@react-navigation/native";

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

  // Customer symptoms
  const [symptom1, setSymptom1] = useState("");
  const [symptoms1Clicked, setSymptom1Clicked] = useState(false)
  const [symptoms1ClickedLabel, setSymptom1ClickedLabel] = useState("")
  const [symptom2, setSymptom2] = useState('');
  const [symptoms2Clicked, setSymptom2Clicked] = useState(false)
  const [symptoms2ClickedLabel, setSymptom2ClickedLabel] = useState("")

  const [symptom3, setSymptom3] = useState("");
  const [symptoms3Clicked, setSymptom3Clicked] = useState(false)



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

