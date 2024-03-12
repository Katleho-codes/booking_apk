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



export default function Terms() {
    const [pointOneChecked, setIsPointOneChecked] = useState(false)
    const [pointTwoChecked, setIsPointTwoChecked] = useState(false)
    const [reasonForNotCheckingPointTwo, setReasonForNotCheckingPointTwo] = useState("")
    const [pointThreeChecked, setIsPointThreeChecked] = useState(false)
    const [reasonForNotCheckingPointThree, setReasonForNotCheckingPointThree] = useState("")
    const [pointFourChecked, setIsPointFourChecked] = useState(false)
    const [reasonForNotCheckingPointFour, setReasonForNotCheckingPointFour] = useState("")
    const [pointFiveChecked, setIsPointFiveChecked] = useState(false)
    const [reasonForNotCheckingPointFive, setReasonForNotCheckingPointFive] = useState("")
    const [readTerms, setReadTerms] = useState(false)


    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
        useMultistepForm([
            <PointOne pointOneChecked={pointOneChecked} togglePointOneSwitch={() => setIsPointOneChecked(previousState => !previousState)} />,
            <PointTwo pointTwoChecked={pointTwoChecked} reasonForNotCheckingPointTwo={reasonForNotCheckingPointTwo} setReasonForNotCheckingPointTwo={(e) => setReasonForNotCheckingPointTwo(e)} togglePointTwoSwitch={() => setIsPointTwoChecked(previousState => !previousState)} />,
            <PointThree pointThreeChecked={pointThreeChecked} reasonForNotCheckingPointThree={reasonForNotCheckingPointThree} setReasonForNotCheckingPointThree={(e) => setReasonForNotCheckingPointThree(e)} togglePointThreeSwitch={() => setIsPointThreeChecked(previousState => !previousState)} />,
            <PointFour pointFourChecked={pointFourChecked} reasonForNotCheckingPointFour={reasonForNotCheckingPointFour} setReasonForNotCheckingPointFour={(e) => setReasonForNotCheckingPointFour(e)} togglePointFourSwitch={() => setIsPointFourChecked(previousState => !previousState)} />,
            <PointFive pointFiveChecked={pointFiveChecked} reasonForNotCheckingPointFive={reasonForNotCheckingPointFive} setReasonForNotCheckingPointFive={(e) => setReasonForNotCheckingPointFive(e)} togglePointFiveSwitch={() => setIsPointFiveChecked(previousState => !previousState)} />,
            <SignTerms readTerms={readTerms} setReadTerms={() => setReadTerms(previousState => !previousState)} />
        ])

    const sendAgreedTerms = async () => {
        const values = {
            pointOneChecked,
            pointTwoChecked,
            pointThreeChecked,
            pointFourChecked,
            pointFiveChecked,
        }
        console.log(values)
    }

    const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
<style>
  @page {
    margin: 20px;
  }
</style>
  </head>
  <body style="font-family: Inter, sans-serif;text-align: center;">
    <main style="border: 1px solid #0d0d0d; max-width: 90%; margin: 0 auto;">

    <h1 style="font-size: 1.5rem;">Terms and conditions</h1>
    </main>
  </body>
</html>
`;

    const [file, setFile] = useState("")



    const printToFile = async () => {
        const { uri } = await Print.printToFileAsync({
            html: html,
            base64: true,
            margins: {
                left: 20,
                top: 50,
                right: 20,
                bottom: 100,
            },
        });
        console.log('File has been saved to:', uri);
        // await shareAsync(uri)
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });

    };


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
                <Button title="Print to PDF file" onPress={printToFile} />
            </Container>
        </>
    )
}