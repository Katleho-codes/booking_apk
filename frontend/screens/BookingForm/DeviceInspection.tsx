import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from 'axios';
import Checkbox from 'expo-checkbox';
import * as FileSystem from "expo-file-system";
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, Modal, ScrollView, StatusBar, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import SignatureScreen, {
    SignatureViewRef,
} from "react-native-signature-canvas";
import CustomButton from '../../components/Button';
import Container from '../../components/Container';
import SectionHeaderTitle from '../../components/SectionHeaderTitle';
import { assetTypes } from '../../utils/assetTypes';
import { Colors } from '../../utils/colors';
import { faultOccurences } from '../../utils/faultOccurences';
import { datetimestamp } from '../../utils/timezone';
import { styles } from './style';




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
    const { email, customUUID }: any = route?.params;

    // Terms and conditions sigpad
    const [userTermsSignature, setUserTermsSignature] = useState("");
    const [signatureTermsExists, setSignatureTermsExists] = useState(false)
    const [readTerms, setReadTerms] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    const { height, width, scale, fontScale } = useWindowDimensions();

    const toggleTermsAndModal = () => {
        setReadTerms(prev => !prev);
        setModalVisible(true);
    }

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
            .then(() => {
                // 
            })
            .catch(() => {
                // 
            });
    };

    const handleTermsSignatureOK = (signature: any) => {
        // console.log("signature", signature);
        handleOK(signature); // Callback from Component props
        setUserTermsSignature(signature)
        setSignatureTermsExists(true)
    }

    // Called after ref.current.readSignature() reads an empty string
    const handleTermsSignatureEmpty = () => {
        // console.log("Empty");
    };

    // Called after ref.current.clearSignature()
    const handleTermsSignatureClear = () => {
        // console.log("clear success!");
    };

    // Called after end of stroke
    const handleTermsSignatureEnd = () => {
        termsRef?.current?.readSignature();
    };

    // Called after ref.current.getData()
    const handleData = (data: any) => {
        // console.log(data);
    };



    const updateEntry = ({ ticketNumber }: string | number | any) => {
        const updatedAt = datetimestamp;
        const values = {
            fault,
            faultOccurence,
            assetType,
            ticketNumber,
            updatedAt,
            customUUID,
        }
        // console.log(values)
        const response = fetch(`${process.env.EXPO_PUBLIC_BACKEND_LINK}/${customUUID}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then((res) => res.json(

        )).catch((error) => {
            // 
        })


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
            navigation.navigate("Home")
        } catch (error) {
            //   
        }
    }

    const openTermsAndConditions = async () => {
        await WebBrowser.openBrowserAsync(`${process.env.EXPO_PUBLIC_TERMS_LINK}`);
    }
    const openBackupTermsAndConditions = async () => {
        await WebBrowser.openBrowserAsync(`${process.env.EXPO_PUBLIC_BACKUP_TERMS_LINK}`);
    }
    const toggleBackupNeededCheckbox = () => {
        setIsBackUpNeedCheckboxEnabled(prev => !prev);
        openBackupTermsAndConditions()
    }
    return (
        <>
            <StatusBar />
            <Container>
                <SectionHeaderTitle title='Device Inspection' />
                <View>
                    <ScrollView>
                        <View
                            style={styles.textInputParent}
                        >
                            <TextInput
                                placeholder='Fault description'
                                placeholderTextColor={`${Colors.grey}`}
                                style={styles.textInput}
                                editable={true}
                                value={fault}
                                onChangeText={e => setFault(e)}
                            />
                        </View>
                        <View
                            style={styles.textInputParent}
                        >
                            {/* Dropdown menu */}
                            <Dropdown
                                style={[
                                    styles.dropdownInput,
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
                                itemTextStyle={styles.dropdownInputText}
                                placeholderStyle={styles.dropdownInputPlaceholder}
                            />
                        </View>
                        <View
                            style={styles.textInputParent}
                        >
                            {/* Dropdown menu */}
                            <Dropdown
                                style={[
                                    styles.dropdownInput,
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
                                itemTextStyle={styles.dropdownInputText}
                                placeholderStyle={styles.dropdownInputPlaceholder}
                            />
                        </View>

                        <View style={{
                            gap: 10,
                            marginVertical: 8
                        }}>
                            <CustomButton text="Read our terms"
                                fontSize={14}
                                buttonBgColor={`${Colors.grey}`}
                                pressedButtonBgColor={`${Colors.black}`} onPress={openTermsAndConditions} />

                        </View>
                        <View style={styles.checkboxWrapper}>
                            <Text style={styles.checkboxLabel}>I agree with the terms and conditions</Text>
                            <Checkbox value={readTerms} onValueChange={toggleTermsAndModal} />
                        </View>
                        {
                            readTerms === true ? (<View style={styles.modalOpenStyles}>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => {
                                        Alert.alert('Modal has been closed.');
                                        setModalVisible(!modalVisible);
                                    }}>
                                    <View style={styles.modalContent}>
                                        <View style={[styles.modalSignaturePadWrapper, {
                                            width: width, shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                        }]}>
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
                                <Checkbox value={isBackUpNeedCheckboxEnabled} onValueChange={toggleBackupNeededCheckbox} />
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