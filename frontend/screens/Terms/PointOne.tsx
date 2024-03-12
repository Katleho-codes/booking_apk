import { View, Text, Switch, ScrollView } from 'react-native'
import React from 'react'
import { useTermsAndConditions } from '../../hooks/useTermsAndConditions';
import Checkbox from 'expo-checkbox';
import { Colors } from '../../utils/colors';


interface IPointOne {
    pointOneChecked: boolean;
    togglePointOneSwitch: (e: boolean) => void;
}

export default function PointOne({ pointOneChecked, togglePointOneSwitch }: IPointOne) {
    const { termsAndConditions } = useTermsAndConditions()
    let filtered = termsAndConditions.filter((item) => item.is_bold !== true)
    return (
        <ScrollView>

            {
                filtered.map((item, index) => (
                    <View key={item.term_id} >
                        <Text style={{
                            paddingVertical: 10,
                            fontFamily: "Inter_400Regular",
                            color: `${Colors.black}`
                        }}>{index + 1}.  {item.term_description}</Text>
                    </View>
                ))
            }
            {/* <Checkbox color={`${Colors.lightBlue}`} value={pointOneChecked} onValueChange={setIsPointOneChecked} /> */}
        </ScrollView>
    )
}