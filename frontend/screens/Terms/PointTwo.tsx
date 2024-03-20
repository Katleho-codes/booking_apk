import { View, Text, Switch, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { useTermsAndConditions } from '../../hooks/useTermsAndConditions';
import Checkbox from 'expo-checkbox';
import { Colors } from '../../utils/colors';


interface IPointTwo {
    pointTwoChecked: boolean;
    togglePointTwoSwitch: (e: boolean) => void;
    reasonForNotCheckingPointTwo: string;
    setReasonForNotCheckingPointTwo: (e: string) => void;
}

export default function PointTwo({ pointTwoChecked, togglePointTwoSwitch, reasonForNotCheckingPointTwo, setReasonForNotCheckingPointTwo }: IPointTwo) {
    const { termsAndConditions } = useTermsAndConditions()
    let filtered = termsAndConditions.filter((item) => item.term_id === "4")
    return (
        <View>

            {
                filtered.map((item, index) => (
                    <View key={item.term_id} >
                        <Text style={{
                            paddingVertical: 10,
                            fontFamily: "Inter_500Medium",
                            color: `${Colors.black}`
                        }}>{item.term_description}</Text>
                    </View>
                ))
            }
            {filtered && (
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 8 }}>
                    <Text style={{
                        paddingVertical: 10,
                        fontFamily: "Inter_400Regular",
                        color: `${Colors.black}`
                    }}>Do you agree with the above term?</Text>
                    <Checkbox value={pointTwoChecked} onValueChange={togglePointTwoSwitch} />
                </View>
            )}
            {
                pointTwoChecked === false ? (
                    <View
                        style={{
                            marginVertical: 4,
                        }}
                    >
                        <TextInput

                            style={{
                                borderWidth: 1,
                                paddingHorizontal: 10,
                                paddingVertical: 12,
                                borderColor: "#eee",
                                borderRadius: 2,
                                fontFamily: "Inter_400Regular",
                                width: "100%",
                            }}
                            editable={true}
                            value={reasonForNotCheckingPointTwo}
                            onChangeText={e => setReasonForNotCheckingPointTwo(e)}
                            placeholder='Reason for not agreeing'
                            placeholderTextColor={`${Colors.grey}`}
                            maxLength={100}
                            keyboardType="default"
                            multiline={true}
                            numberOfLines={3}
                        />
                    </View>
                ) : null
            }
            {/* <Checkbox color={`${Colors.lightBlue}`} value={pointTwoChecked} onValueChange={setIsPointTwoChecked} /> */}
        </View>
    )
}