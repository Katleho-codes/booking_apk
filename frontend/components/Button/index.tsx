

import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from './style';
import { TCustomButton } from './types';




export default function CustomButton({ text, fontSize, onPress, buttonBgColor, pressedButtonBgColor }: TCustomButton) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.buttonStyles]}>
            <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    )
}