import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInLeft, FadeInRight, FadeOut } from 'react-native-reanimated';
import CustomButton from '../../components/Button';
import { Colors } from '../../utils/colors';


export default function PromptsScreen() {
    // Navigation hook
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const GotoNext = () => {
        navigation.navigate("SearchCustomer")
    }
    const GotoCustomerDetails = () => {
        navigation.navigate("CustomerDetails")
    }
    return (
        <View style={{
            flex: 1,
            padding: 10,
            backgroundColor: "#fff",
            alignItems: 'center',
            justifyContent: 'center',

        }}>

            <Text style={{
                color: Colors.black,
                fontSize: 18,
                fontFamily: "Inter_500Medium",
                textAlign: "center",
                justifyContent: "space-around",
            }}>Have you been here before?</Text>
            <View style={{
                gap: 10
            }}>
                <View style={{
                    marginVertical: 8
                }}>
                    <Animated.View entering={FadeInLeft} exiting={FadeOut}>
                        <CustomButton
                            onPress={GotoNext}
                            text="Yes, I have"
                            fontSize={14}
                            buttonBgColor={`${Colors.lightBlue}`}
                            pressedButtonBgColor={`${Colors.blue}`}
                        />
                    </Animated.View>
                </View>
                <Animated.View entering={FadeInRight} exiting={FadeOut}>
                    <CustomButton
                        onPress={GotoCustomerDetails}
                        text="No, first time"
                        fontSize={14}
                        buttonBgColor={`${Colors.lightBlue}`}
                        pressedButtonBgColor={`${Colors.blue}`}
                    />
                </Animated.View>
            </View>
        </View>
    )
}