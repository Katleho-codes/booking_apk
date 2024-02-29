import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../../components/Button'
import { Colors } from '../../utils/colors'
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function PromptsScreen() {
    // Navigation hook
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const GotoNext = () => { }
    const GotoBookingForm = () => {
        navigation.navigate("BookingForm")
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
                    <CustomButton
                        onPress={GotoNext}
                        text="Yes, I have"
                        fontSize={14}
                        buttonBgColor={`${Colors.lightBlue}`}
                        pressedButtonBgColor={`${Colors.blue}`}
                    />
                </View>
                <CustomButton
                    onPress={GotoBookingForm}
                    text="No, first time"
                    fontSize={14}
                    buttonBgColor={`${Colors.lightBlue}`}
                    pressedButtonBgColor={`${Colors.blue}`}
                />
            </View>
        </View>
    )
}