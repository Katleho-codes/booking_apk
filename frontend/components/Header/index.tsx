import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { styles } from './style';
import { THeader } from './types';



export default function Header({ text }: THeader) {
    return (
        <>
            <StatusBar />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{text}</Text>
            </View>
        </>
    )
}