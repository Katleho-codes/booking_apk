import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from 'axios';
import Checkbox from 'expo-checkbox';
import * as FileSystem from "expo-file-system";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, Modal, Pressable, useWindowDimensions, ScrollView, StatusBar, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import SignatureScreen, {
    SignatureViewRef,
} from "react-native-signature-canvas";
import Accordion from '../../components/Accordion';
import CustomButton from '../../components/Button';
import Container from '../../components/Container';
import SectionHeaderTitle from '../../components/SectionHeaderTitle';
import { useMultistepForm } from '../../hooks/useMultistepForm';
import { assetTypes } from '../../utils/assetTypes';
import { Colors } from '../../utils/colors';
import { faultOccurences } from '../../utils/faultOccurences';
import { datetimestamp } from '../../utils/timezone';
import BackupTerms from '../BackupTerms';
import PointFour from '../Terms/PointFour';
import PointOne from '../Terms/PointOne';
import PointThree from '../Terms/PointThree';
import PointTwo from '../Terms/PointTwo';





export default function DeviceInspection() {
    const [isAssetDropdownFocus, setIsAssetDropdownFocus] = useState(false)
    const [assetType, setAssetType] = useState("");
    const [isBackUpNeedCheckboxEnabled, setIsBackUpNeedCheckboxEnabled] = useState(false)
    // Navigation hook
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [fault, setFault] = useState("")
    const [faultOccurence, setFaultOccurence] = useState("")
    const [faultOccurenceFocus, setFaultOccurenceFocus] = useState(false)
    const route = useRoute();
    const [customerId, setCustomerId] = useState<any>("")
    // const [ticketNumber, setTicketNumber] = useState<string | number>("")
    const { email, customUUID }: any = route?.params;

    // Terms and conditions sigpad
    const [userTermsSignature, setUserTermsSignature] = useState("");
    const [signatureTermsExists, setSignatureTermsExists] = useState(false)
    const [readTerms, setReadTerms] = useState(false)
    const [pointOneChecked, setIsPointOneChecked] = useState<boolean>(false)
    const [pointTwoChecked, setIsPointTwoChecked] = useState<boolean>(false)
    const [reasonForNotCheckingPointTwo, setReasonForNotCheckingPointTwo] = useState("")
    const [pointThreeChecked, setIsPointThreeChecked] = useState<boolean>(false)
    const [reasonForNotCheckingPointThree, setReasonForNotCheckingPointThree] = useState("")
    const [pointFourChecked, setIsPointFourChecked] = useState<boolean>(false)
    const [reasonForNotCheckingPointFour, setReasonForNotCheckingPointFour] = useState("")

    const [modalVisible, setModalVisible] = useState(false);

    const { height, width, scale, fontScale } = useWindowDimensions();
    const toggleTermsAndModal = () => {
        setReadTerms(prev => !prev);
        setModalVisible(true);

    }

    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
        useMultistepForm([
            <PointOne />,
            <PointTwo pointTwoChecked={pointTwoChecked} reasonForNotCheckingPointTwo={reasonForNotCheckingPointTwo} setReasonForNotCheckingPointTwo={(e) => setReasonForNotCheckingPointTwo(e)} togglePointTwoSwitch={() => setIsPointTwoChecked(previousState => !previousState)} />,
            <PointThree pointThreeChecked={pointThreeChecked} reasonForNotCheckingPointThree={reasonForNotCheckingPointThree} setReasonForNotCheckingPointThree={(e) => setReasonForNotCheckingPointThree(e)} togglePointThreeSwitch={() => setIsPointThreeChecked(previousState => !previousState)} />,
            <PointFour pointFourChecked={pointFourChecked} reasonForNotCheckingPointFour={reasonForNotCheckingPointFour} setReasonForNotCheckingPointFour={(e) => setReasonForNotCheckingPointFour(e)} togglePointFourSwitch={() => setIsPointFourChecked(previousState => !previousState)} />,
            <BackupTerms />
            // <SignTerms readTerms={readTerms} setReadTerms={() => setReadTerms(previousState => !previousState)} />
        ])

    // For terms and conditions
    const termsRef = useRef<SignatureViewRef>(null);

    const handleOK = (signature: any) => {
        const path = FileSystem.cacheDirectory + "sign.png";
        FileSystem.writeAsStringAsync(
            path,
            signature.replace("data:image/png;base64,", ""),
            { encoding: FileSystem.EncodingType.Base64 }
        )
            .then(() => FileSystem.getInfoAsync(path))
            .then(console.log)
            .catch(console.error);
    };

    const handleTermsSignatureOK = (signature: any) => {
        // console.log("signature", signature);
        handleOK(signature); // Callback from Component props
        setUserTermsSignature(signature)
        setSignatureTermsExists(true)
    }
    console.log(readTerms)

    // Called after ref.current.readSignature() reads an empty string
    const handleTermsSignatureEmpty = () => {
        console.log("Empty");
    };

    // Called after ref.current.clearSignature()
    const handleTermsSignatureClear = () => {
        console.log("clear success!");
    };

    // Called after end of stroke
    const handleTermsSignatureEnd = () => {
        termsRef?.current?.readSignature();
    };

    // Called after ref.current.getData()
    const handleData = (data: any) => {
        console.log(data);
    };


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
  table {
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  font-size: 10px;
  
}
image {
    width:100%;
    height: auto;
}

</style>
  </head>
  <body style="font-family: Inter, sans-serif;">
    <main style="margin: 0 auto;">

    <h1 style="font-size: 1.5rem; text-align: center;">Terms and conditions</h1>
    <h4 style="text-align: center;"></h4>
<table>
  <tr>
     <td>In order to protect your property, repairs will only be returned upon presentation of your receipt.</td>
    <td><input type="checkbox" checked></td>
  </tr>
  <tr>
     <td>When handing over your product for repair, please remove your SIM card, battery, charger, and all accessories.</td>
      <td><input type="checkbox" checked></td>
  </tr>
  <tr>
     <td>Samsung and/or its accredited service center(s) will not be held liable for any loss incurred as a result of robbery or forced entry to our premises.</td>
     <td><input type="checkbox" checked></td>
  </tr>
  <tr>
     <td style="font-weight: bold;">Any repairs not collected within 30 days of repair completion, after notification to the customer, will be sold to defray expenses.</td>
    <td><div style="width: 40px; display: flex; justify-content: center; margin: 1rem auto; height: 30px">
       ${pointOneChecked === true ? `<img
        src=${userTermsSignature}
        style="width: 5vw;" />`: ""}
   </div></td>
  </tr>
  <tr>
     <td>Samsung and/or its service center will be deemed authorized to undertake any repairs should the cost be less than the minimum amount of a quotation.</td>
    <td><input type="checkbox" checked></td>
  </tr>
  <tr>
     <td style="font-weight: bold;">This service order / job card DOES NOT AUTHORIZE ANY EXCHANGE OF YOUR DEVICE. All exchanges for a device must be authorized separately in writing by Samsung. Any handwritten notes made on this service order S.O. or job card that provide for an exchange for your device that is granted verbally by Samsung and/or its Authorized Service Centre are not permitted, and an exchange of your device will not be provided in such instances.</td>
        <td><div style="width: 40px; display: flex; justify-content: center; margin: 1rem auto; height: 30px">
       ${pointTwoChecked === true ? `<img
        src=${userTermsSignature}
        style="width: 5vw;" />`: ""}
   </div></td>
  </tr>
    <tr>
     <td>Once the quotation is accepted by yourself, Samsung and/or its accredited service Centre will be deemed authorized to replace parts and materials as may be necessary, provided the costs do not exceed the value of the quotation provided.</td>
      <td><input type="checkbox" checked></td>
  </tr>
    <tr>
     <td style="font-weight: bold;">A minimum assessment/quotation rejection fee of R250 will be charged on all repairs that are not covered by the manufacturer warranty terms and conditions.</td>
        <td><div style="width: 40px; display: flex; justify-content: center; margin: 1rem auto; height: 30px">
       ${pointThreeChecked === true ? `<img
        src=${userTermsSignature}
        style="width: 5vw;" />`: ""}
   </div></td>
  </tr>
    <tr>
     <td>Repairs to liquid- or corrosion-damaged products will not be repaired under warranty conditions. This is specified within the owner"s manual warranty terms and conditions. Repair, however, can be offered at a cost to you, the end-user.</td>
    <td><input type="checkbox" checked></td>
  </tr>
    <tr>
     <td>All non-warranty repairs are on a C.O.D. (cash on delivery) basis. Samsung and/or its Authorized Service Centre will not dispatch any product repaired until payment in respect of such repairs has been received in full. Payment can be made either by cash or credit card; no cheques will be accepted.</td>
    <td><input type="checkbox" checked></td>
  </tr>
    <tr>
     <td>All repairs undertaken, save those in respect of corrosion, physical damage, and/or liquid damage, are guaranteed against faulty workmanship for a maximum period of 90 days from the date of receipt by the customer.</td>
     <td><input type="checkbox" checked></td>
  </tr>
    <tr>
     <td style="font-weight: bold;">Samsung and/or its Authorized Service Centre will not be held responsible for the loss of any data on any phone handed in for repair. It is your responsibility to ensure that all data is backed up safely.</td>
    <td><div style="width: 40px; display: flex; justify-content: center; margin: 1rem auto; height: 30px">
       ${pointFourChecked === true ? `<img
        src=${userTermsSignature}
        style="width: 5vw;" />`: ""}
   </div></td>
  </tr>
  
</table>
<p><strong>Upon signature of this document and/or any document to which this document is attached shall signify your acceptance of the terms thereof.</strong></p>
<div style="border: 1px solid red; width: 300px; display: flex; justify-content: center; margin: 1rem auto; height: 200px">
       <img
        src=${userTermsSignature}
        style="width: 90vw;" />
   </div>
   
    </main>
  </body>
</html>
`;


    const updateEntry = ({ ticketNumber }: string | number | any) => {
        const updatedAt = datetimestamp;
        const values = {
            fault,
            faultOccurence,
            assetType,
            ticketNumber,
            updatedAt,
            customUUID,
            pointOneChecked,
            pointTwoChecked,
            pointThreeChecked,
            pointFourChecked,
            reasonForNotCheckingPointTwo,
            reasonForNotCheckingPointThree,
            reasonForNotCheckingPointFour,
            userTermsSignature // will save it a as base 64
        }
        console.log(values)
        const response = fetch(`${process.env.EXPO_PUBLIC_BACKEND_LINK}/${customUUID}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then((res) => res.json(

        )).catch((error) => console.log("update ticket error frontend", error)
        )


    }

    const getCustomerId = async () => {
        try {
            const { data } = await axios.get(`${process.env.EXPO_PUBLIC_REPAIRSHOPR_API_SUBDOMAIN}/customers?query=${email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.EXPO_PUBLIC_REPAIRSHOPR_BEARER_TOKEN}`
                },
            })
            if (data?.customers[0]?.email === email) {
                setCustomerId(data?.customers[0]?.id)

            }
        } catch (error) {
            // 
        }
    }
    useEffect(() => {
        getCustomerId()
    }, [email]);



    const printToFile = async () => {
        const { uri } = await Print.printToFileAsync({ html });
        console.log('File has been saved to:', uri);
        // await shareAsync(uri)

        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });


    };
    const createTicket = async () => {
        const values = {
            "customer_id": customerId,
            "problem_type": assetType,
            "subject": fault,
            "status": "New",
        }
        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_REPAIRSHOPR_API_SUBDOMAIN}/tickets`, values, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.EXPO_PUBLIC_REPAIRSHOPR_BEARER_TOKEN}`
                }
            })
            if (response.data) {
                // setTicketNumber(response.data?.ticket?.number)
                let ticketNumber = response?.data?.ticket?.number
                updateEntry({ ticketNumber });
                Alert.alert("Ticket created", `Here is your ticket: ${response.data?.ticket?.number}`)

            }
            printToFile();
            navigation.navigate("Home")
        } catch (error) {
            //   
        }
    }


    return (
        <>
            <StatusBar />
            <Container>
                <SectionHeaderTitle title='Device Inspection' />
                <View>
                    <ScrollView>
                        <View
                            style={{
                                marginVertical: 4,
                            }}
                        >
                            <TextInput
                                placeholder='Fault description'
                                placeholderTextColor={`${Colors.grey}`}
                                style={{
                                    borderWidth: 1,
                                    paddingHorizontal: 10,
                                    paddingVertical: 12,
                                    borderColor: "#eee",
                                    borderRadius: 2,
                                    fontFamily: "Inter_500Medium",
                                    width: "100%",
                                }}
                                editable={true}
                                value={fault}
                                onChangeText={e => setFault(e)}
                            />
                        </View>
                        <View
                            style={{
                                marginVertical: 4,
                            }}
                        >
                            {/* Dropdown menu */}
                            <Dropdown
                                style={[
                                    {
                                        borderColor: "#eee",
                                        borderWidth: 1,
                                        borderRadius: 2,
                                        paddingHorizontal: 10,
                                        paddingVertical: 12,

                                        // color: "#0d0d0d",
                                    },
                                    faultOccurenceFocus && { borderColor: `${Colors.blue}` },
                                ]}

                                // iconStyle={mainStyles.iconStyle}
                                fontFamily='Inter_400Regular'
                                data={faultOccurences}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!faultOccurenceFocus ? "How/When does the fault occur?" : "..."}
                                searchPlaceholder="Search..."
                                value={faultOccurence}
                                onFocus={() => setFaultOccurenceFocus(true)}
                                onBlur={() => setFaultOccurenceFocus(false)}
                                onChange={(item: any) => {
                                    setFaultOccurence(item.value);
                                    setFaultOccurenceFocus(false);
                                }}
                                itemTextStyle={{
                                    fontFamily: "Inter_500Medium",
                                    color: `${Colors.grey}`,
                                    fontSize: 14
                                }}
                                placeholderStyle={{
                                    fontFamily: "Inter_500Medium",
                                    color: `${Colors.grey}`,
                                    fontSize: 14
                                }}
                            />
                        </View>
                        <View
                            style={{
                                marginVertical: 4,
                            }}
                        >
                            {/* Dropdown menu */}
                            <Dropdown
                                style={[
                                    {
                                        borderColor: "#eee",
                                        borderWidth: 1,
                                        borderRadius: 2,
                                        paddingHorizontal: 10,
                                        paddingVertical: 12,

                                        // color: "#0d0d0d",
                                    },
                                    isAssetDropdownFocus && { borderColor: `${Colors.blue}` },
                                ]}

                                // iconStyle={mainStyles.iconStyle}
                                fontFamily='Inter_400Regular'
                                data={assetTypes}
                                // search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isAssetDropdownFocus ? "What are you booking?" : "..."}
                                searchPlaceholder="Search..."
                                value={assetType}
                                onFocus={() => setIsAssetDropdownFocus(true)}
                                onBlur={() => setIsAssetDropdownFocus(false)}
                                onChange={(item: any) => {
                                    setAssetType(item.value);
                                    setIsAssetDropdownFocus(false);
                                }}
                                itemTextStyle={{
                                    fontFamily: "Inter_500Medium",
                                    color: `${Colors.grey}`,
                                    fontSize: 14
                                }}
                                placeholderStyle={{
                                    fontFamily: "Inter_500Medium",
                                    color: `${Colors.grey}`,
                                    fontSize: 14
                                }}
                            />
                        </View>

                        <View style={{
                            gap: 10,
                            marginVertical: 8
                        }}>
                            <Accordion title='Read our terms and conditions' details={
                                <>
                                    {step}
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
                                        {!isLastStep ? <CustomButton
                                            onPress={next}
                                            text="Next"
                                            fontSize={14}
                                            buttonBgColor={`${Colors.lightBlue}`}
                                            pressedButtonBgColor={`${Colors.blue}`}
                                        /> : ""}

                                        {/* {
                                        isLastStep ? <CustomButton
                                            onPress={() => {
                                                console.log("pointOneChecked", pointOneChecked);
                                                console.log("pointTwoChecked", pointTwoChecked);
                                                console.log("pointThreeChecked", pointThreeChecked);
                                                console.log("pointFourChecked", pointFourChecked);
                                            }}
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
                                    } */}
                                    </View>




                                </>

                            } />

                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 8 }}>
                            <Text style={{
                                paddingVertical: 10,
                                fontFamily: "Inter_400Regular",
                                color: `${Colors.black}`
                            }}>I agree with the terms and conditions</Text>
                            <Checkbox value={readTerms} onValueChange={toggleTermsAndModal} />
                        </View>
                        {
                            readTerms === true ? (<View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 22,
                            }}>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => {
                                        Alert.alert('Modal has been closed.');
                                        setModalVisible(!modalVisible);
                                    }}>
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: "#00000040",
                                        padding: 10
                                    }}>
                                        <View style={{
                                            width: width,
                                            height: 400,
                                            margin: 20,
                                            backgroundColor: 'white',
                                            borderRadius: 4,
                                            padding: 35,
                                            alignItems: 'center',
                                            shadowColor: '#000',
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 4,
                                            elevation: 5,
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 30
                                        }}>
                                            <SignatureScreen
                                                ref={termsRef}
                                                onEnd={handleTermsSignatureEnd}
                                                onOK={handleTermsSignatureOK}
                                                onEmpty={handleTermsSignatureEmpty}
                                                onClear={handleTermsSignatureClear}
                                                onGetData={handleData}
                                                autoClear={true}
                                                descriptionText={"Signature pad"}
                                            />

                                            <CustomButton text="Done signing"
                                                fontSize={14}
                                                buttonBgColor={`${Colors.lightBlue}`}
                                                pressedButtonBgColor={`${Colors.blue}`} onPress={() => setModalVisible(!modalVisible)} />

                                        </View>
                                    </View>
                                </Modal>
                            </View>) : ""
                        }

                        <View>
                            {signatureTermsExists === true ? (
                                <Image
                                    resizeMode={"contain"}
                                    style={{ borderWidth: 1, height: 200 }}
                                    source={{ uri: userTermsSignature }}
                                />
                            ) : null}
                        </View>

                        {assetType === "HHP(Mobile Phone/Tablets)" ?
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 8 }}>
                                <Text style={{
                                    paddingVertical: 10,
                                    fontFamily: "Inter_400Regular",
                                    color: `${Colors.black}`
                                }}>Does your phone require backup?(If no, leave unchecked)</Text>
                                <Checkbox value={isBackUpNeedCheckboxEnabled} onValueChange={setIsBackUpNeedCheckboxEnabled} />
                            </View> : ""
                        }


                        <CustomButton text="Create ticket"
                            fontSize={14}
                            buttonBgColor={`${Colors.lightBlue}`}
                            pressedButtonBgColor={`${Colors.blue}`} onPress={createTicket} />

                    </ScrollView>
                </View>
            </Container>

        </>
    )
}