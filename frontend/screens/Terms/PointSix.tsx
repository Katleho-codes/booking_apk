import { View, Text, Switch } from 'react-native'
import React from 'react'
import { useTermsAndConditions } from '../../hooks/useTermsAndConditions';
import Checkbox from 'expo-checkbox';
import { Colors } from '../../utils/colors';


interface IPointSix {
    pointSixChecked: boolean;
    togglePointSixSwitch: (e: boolean) => void;
}

export default function PointSix({ pointSixChecked, togglePointSixSwitch }: IPointSix) {
    const { termsAndConditions } = useTermsAndConditions()
    let filtered = termsAndConditions.filter((item) => item.term_id === "6")

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: "center",
        }}>
            {
                filtered.map((item, index) => (
                    <View key={item.term_id} style={{
                        flexDirection: "row",
                        gap: 2,
                        width: "80%",
                        flexWrap: "wrap",
                        padding: 1
                    }}>
                        <Text style={{
                            flexWrap: "wrap",
                            fontFamily: "Inter_600SemiBold",
                            color: `${Colors.black}`
                        }}>{item.term_description}</Text>
                    </View>
                ))
            }
            <View style={{
                width: "20%",
            }}>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={pointSixChecked ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={togglePointSixSwitch}
                    value={pointSixChecked}
                />
            </View>
            {/* <Checkbox color={`${Colors.lightBlue}`} value={pointSixChecked} onValueChange={setIsPointSixChecked} /> */}
        </View>
    )
}