import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import React, { useState } from 'react';
import { Button, View } from 'react-native';
import CustomButton from '../../components/Button';
import Container from '../../components/Container';
import HeaderSteps from '../../components/HeaderSteps';
import { useMultistepForm } from '../../hooks/useMultistepForm';
import { Colors } from '../../utils/colors';
import PointFive from './PointFive';
import PointFour from './PointFour';
import PointOne from './PointOne';
import PointThree from './PointThree';
import PointTwo from './PointTwo';
import SignTerms from './SignTerms';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackupTerms from '../BackupTerms';


export default function Terms() {
    const [pointOneChecked, setIsPointOneChecked] = useState(false)
    const [pointTwoChecked, setIsPointTwoChecked] = useState(false)
    const [reasonForNotCheckingPointTwo, setReasonForNotCheckingPointTwo] = useState("")
    const [pointThreeChecked, setIsPointThreeChecked] = useState(false)
    const [reasonForNotCheckingPointThree, setReasonForNotCheckingPointThree] = useState("")
    const [pointFourChecked, setIsPointFourChecked] = useState(false)
    const [reasonForNotCheckingPointFour, setReasonForNotCheckingPointFour] = useState("")
    const [readTerms, setReadTerms] = useState(false)

    // Navigation hook
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
        useMultistepForm([
            <PointOne pointOneChecked={pointOneChecked} togglePointOneSwitch={() => setIsPointOneChecked(previousState => !previousState)} />,
            <PointTwo pointTwoChecked={pointTwoChecked} reasonForNotCheckingPointTwo={reasonForNotCheckingPointTwo} setReasonForNotCheckingPointTwo={(e) => setReasonForNotCheckingPointTwo(e)} togglePointTwoSwitch={() => setIsPointTwoChecked(previousState => !previousState)} />,
            <PointThree pointThreeChecked={pointThreeChecked} reasonForNotCheckingPointThree={reasonForNotCheckingPointThree} setReasonForNotCheckingPointThree={(e) => setReasonForNotCheckingPointThree(e)} togglePointThreeSwitch={() => setIsPointThreeChecked(previousState => !previousState)} />,
            <PointFour pointFourChecked={pointFourChecked} reasonForNotCheckingPointFour={reasonForNotCheckingPointFour} setReasonForNotCheckingPointFour={(e) => setReasonForNotCheckingPointFour(e)} togglePointFourSwitch={() => setIsPointFourChecked(previousState => !previousState)} />,
            <BackupTerms />
            // <SignTerms readTerms={readTerms} setReadTerms={() => setReadTerms(previousState => !previousState)} />
        ])

    const sendAgreedTerms = async () => {
        const values = {
            pointOneChecked,
            pointTwoChecked,
            pointThreeChecked,
            pointFourChecked,
        }
        const pointOne = ["pointOneChecked", `${pointOneChecked}`] as any
        const pointTwo = ["pointTwoChecked", `${pointTwoChecked}`] as any
        const pointThree = ["pointThreeChecked", `${pointThreeChecked}`] as any
        const pointFour = ["pointFourChecked", `${pointFourChecked}`] as any
        await AsyncStorage.multiSet([pointOne, pointTwo, pointThree, pointFour])

        navigation.goBack()
    }




    return (

        <>

            <HeaderSteps currentStepIndex={currentStepIndex} steps={steps} />
            <Container>
                {step}
                <View>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 10,
                        marginBottom: 10
                    }}>
                        {!isFirstStep && (
                            <CustomButton
                                onPress={back}
                                text="Back"
                                fontSize={14}
                                buttonBgColor={`${Colors.lightBlue}`}
                                pressedButtonBgColor={`${Colors.blue}`}
                            />
                        )}

                        {
                            isLastStep ? <CustomButton
                                onPress={sendAgreedTerms}
                                text="Finish"
                                fontSize={14}
                                buttonBgColor={`${Colors.lightBlue}`}
                                pressedButtonBgColor={`${Colors.blue}`}
                            /> : <CustomButton
                                onPress={next}
                                text="Next"
                                fontSize={14}
                                buttonBgColor={`${Colors.lightBlue}`}
                                pressedButtonBgColor={`${Colors.blue}`}
                            />
                        }
                    </View>


                </View>
            </Container>
        </>
    )
}