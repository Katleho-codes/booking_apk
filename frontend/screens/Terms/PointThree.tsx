import { View, Text, Switch, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { useTermsAndConditions } from '../../hooks/useTermsAndConditions';
import Checkbox from 'expo-checkbox';
import { Colors } from '../../utils/colors';


interface IPointThree {
    pointThreeChecked: boolean;
    togglePointThreeSwitch: (e: boolean) => void;
    reasonForNotCheckingPointThree: string;
    setReasonForNotCheckingPointThree: (e: string) => void;
}

export default function PointThree({ pointThreeChecked, togglePointThreeSwitch, reasonForNotCheckingPointThree, setReasonForNotCheckingPointThree }: IPointThree) {
    const { termsAndConditions } = useTermsAndConditions()
    let filtered = termsAndConditions.filter((item) => item.term_id === "6")
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
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 8 }}>
                <Text style={{
                    paddingVertical: 10,
                    fontFamily: "Inter_400Regular",
                    color: `${Colors.black}`
                }}>Do you agree with the above term?</Text>
                <Checkbox value={pointThreeChecked} onValueChange={togglePointThreeSwitch} />
            </View>
            {
                pointThreeChecked === false ? (
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
                            value={reasonForNotCheckingPointThree}
                            onChangeText={e => setReasonForNotCheckingPointThree(e)}
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
            {/* <Checkbox color={`${Colors.lightBlue}`} value={pointThreeChecked} onValueChange={setIsPointThreeChecked} /> */}
        </View>
    )
}