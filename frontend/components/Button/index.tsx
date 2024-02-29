

import { View, Text, Pressable } from 'react-native'
import React from 'react'


type TCustomButton = {
    text: string;
    onPress: () => void;
    fontSize: number;
    buttonBgColor: string;
    pressedButtonBgColor: string;

}

export default function CustomButton({ text, fontSize, onPress, buttonBgColor, pressedButtonBgColor }: TCustomButton) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [{
            paddingVertical: 14,
            paddingHorizontal: 18,
            borderWidth: 0,
            borderRadius: 4,
            elevation: 2,
            // width: "100%",
            backgroundColor: pressed ? pressedButtonBgColor : buttonBgColor,
        }]}>
            <Text style={{
                color: "white",
                fontSize: fontSize,
                fontWeight: "600",
                textAlign: "center",
                textTransform: "capitalize",
                justifyContent: "space-around",
            }}>{text}</Text>
        </Pressable>
    )
}