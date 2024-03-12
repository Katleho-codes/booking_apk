import { View, Text, Switch, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { useTermsAndConditions } from '../../hooks/useTermsAndConditions';
import Checkbox from 'expo-checkbox';
import { Colors } from '../../utils/colors';


interface IPointFive {
    pointFiveChecked: boolean;
    togglePointFiveSwitch: (e: boolean) => void;
    reasonForNotCheckingPointFive: string;
    setReasonForNotCheckingPointFive: (e: string) => void;
}

export default function PointFive({ pointFiveChecked, togglePointFiveSwitch, reasonForNotCheckingPointFive, setReasonForNotCheckingPointFive }: IPointFive) {
    const { termsAndConditions } = useTermsAndConditions()
    let filtered = termsAndConditions.filter((item) => item.term_id === "12")
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
                <Checkbox value={pointFiveChecked} onValueChange={togglePointFiveSwitch} />
            </View>
            {
                pointFiveChecked === false ? (
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
                            value={reasonForNotCheckingPointFive}
                            onChangeText={e => setReasonForNotCheckingPointFive(e)}
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
            {/* <Checkbox color={`${Colors.lightBlue}`} value={pointFiveChecked} onValueChange={setIsPointFiveChecked} /> */}
        </View>
    )
}