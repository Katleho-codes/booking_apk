import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../../utils/colors';

type TSectionHeaderTitle = {
    title: string;
}

export default function SectionHeaderTitle({ title }: TSectionHeaderTitle) {
    return (

        <Text style={{
            fontFamily: "Inter_600SemiBold",
            color: `${Colors.blue}`,
            marginVertical: 5,
            textAlign: "center",
            fontSize: 18,
            textTransform: "capitalize"
        }}>{title}</Text>
    )
}