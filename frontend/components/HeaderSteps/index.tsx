import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../../utils/colors';


type THeaderSteps = {
    currentStepIndex: number;
    steps: any;
}
export default function HeaderSteps({ currentStepIndex, steps }: THeaderSteps) {
    return (
        <View style={{
            width: "100%",
            padding: 20,
            backgroundColor: `${Colors.white}`,
            borderWidth: 1,
            borderColor: `${Colors.lightGrey}`,
            borderRadius: 2,
        }}>
            <Text style={{
                textAlign: "center",
                color: `${Colors.blue}`,
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "Inter_500Medium",
                width: "100%",
            }}>Steps {currentStepIndex + 1} of {steps.length}</Text>
        </View>
    )
}