import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from 'axios';
import { CameraView, useCameraPermissions } from 'expo-camera/next';
import Checkbox from 'expo-checkbox';
import * as WebBrowser from 'expo-web-browser';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StatusBar, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from 'react-native-ui-datepicker';
import CustomButton from '../../components/Button';
import Container from '../../components/Container';
import SectionHeaderTitle from '../../components/SectionHeaderTitle';
import { Colors } from '../../utils/colors';
import { faultOccurences } from '../../utils/faultOccurences';
import { datetimestamp } from '../../utils/timezone';
import { styles } from './style';


export default function DeviceInspection() {
    const [isBackUpNeedCheckboxEnabled, setIsBackUpNeedCheckboxEnabled] = useState(false)
    // Navigation hook
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    // This is for repairshopr
    const [ticketTypeId, setTicketTypeId] = useState<number>();
    const [warrantyCode, setWarrantyCode] = useState<number>();
    const [backupCode, setBackupCode] = useState<number>();

    const [fault, setFault] = useState("")
    const [itemCondition, setItemCondition] = useState("")
    const [faultOccurence, setFaultOccurence] = useState("")
    const [faultOccurenceFocus, setFaultOccurenceFocus] = useState(false)
    const route = useRoute();
    const [customerId, setCustomerId] = useState<any>("")
    const { firstname, lastname, email, phoneNumber, createdAt, customUUID, address, address2, city, state, zip }: any = route?.params;


    useEffect(() => {

        if (isBackUpNeedCheckboxEnabled !== false) {
            setBackupCode(69752)
        } else {
            setBackupCode(69753)
        }
    }, [isBackUpNeedCheckboxEnabled])

    // Customer symptoms

    const [IMEI, setIMEI] = useState("");
    const [imeiScanOpen, setImeiScanOpen] = useState(false)
    const [serialNumber, setSerialNumber] = useState("")
    const [serialNumberScanOpen, setserialNumberScanOpen] = useState(false)
    const [modelNumber, setModelNumber] = useState("")
    const [modelScanOpen, setModelScanOpen] = useState(false)
    const [warranty, setWarranty] = useState("");
    const d = new Date(
    )
    const [purchaseDate, setPurchaseDate] = useState(d);
    const [readTerms, setReadTerms] = useState(false);
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const toggleTermsAndModal = () => {
        setReadTerms(prev => !prev);
    }


    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) { }

    if (!permission?.granted) { }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }


    // console.log(date)
    const assetType = "HHP(Mobile Phone/Tablets)"
    const updateEntry = ({ ticketNumber }: string | number | any) => {
        const updatedAt = datetimestamp;
        const values = {
            fault,
            faultOccurence,
            assetType,
            ticketNumber,
            updatedAt,
            modelNumber,
            serialNumber,
            IMEI,
            purchaseDate,
            isBackUpNeedCheckboxEnabled,
            warranty,
            phoneNumber,
            address, address2, city, state, zip,
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
            // console.log("error update", error)
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



    const checkWarranty = async () => {
        const generateTimeStampForPacCode = moment(new Date(
            Date.now() + 1000 * 60 * -new Date().getTimezoneOffset()
        )
            .toISOString()
            .replace("T", " ")
            .replace("Z", "")).format("YYMMDDhhmmss");


        const formattedDate = moment(purchaseDate).format("YYYYMMDD");
        // console.log(formattedDate)
        const values = {
            "IsCommonHeader": {
                "Company": "C720",
                "AscCode": "1730640",
                "Lang": "EN",
                "Country": "ZA",
                "Pac": `9999999${generateTimeStampForPacCode}`
            },
            "IvModel": `${modelNumber}`,
            "IvPurchaseDate": `${purchaseDate ? formattedDate : ""}`,
            "IvSerialNo": `${serialNumber}`,
            "IvIMEI": `${IMEI}`

        }
        // console.log("values", values)
        const response = fetch(`${process.env.EXPO_PUBLIC_IPAAS_LINK}/CheckWarranty/1.0/ImportSet`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.EXPO_PUBLIC_IPAAS_TOKEN}`
            },
            body: JSON.stringify(values)
        }).then((res) => res.json(

        )).then((data) => {
            if (data) {
                // console.log("warranty data", data?.Return?.EvWtyType)
                setWarranty(data?.Return?.EvWtyType);
            }
        }).catch((error) => {
            // console.log("warranty error", error)
        })
    }
    useEffect(() => {
        checkWarranty();
        if (warranty === "LP") {
            setTicketTypeId(21877);
            setWarrantyCode(69476)
        }
        else if (warranty !== "LP") {
            setTicketTypeId(21878);
            setWarrantyCode(69477)
        }
    }, [serialNumber]);


    const createTicket = async () => {
        const values = {
            "customer_id": customerId,
            "problem_type": `${assetType}`, // Will aways be HHP for handheld devices, no need to choose
            "subject": `${fault}`,
            "status": "New",
            "ticket_type_id": `${ticketTypeId}`,
            "properties": {
                "Service Order No.": "",
                "Item Condition ": `${itemCondition}`,
                "Backup Requires": `${backupCode}`,
                "Warranty ": `${warrantyCode}`,
                "IMEI": `${IMEI}`
            }
        }
        // console.log(values)
        await axios.post(`${process.env.EXPO_PUBLIC_REPAIRSHOPR_API_SUBDOMAIN}/tickets`, values, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.EXPO_PUBLIC_REPAIRSHOPR_BEARER_TOKEN}`
            }
        })
            .then((res) => {
                let ticketNumber = res?.data?.ticket?.number
                updateEntry({ ticketNumber });
                Alert.alert("Ticket created", `Here is your ticket: ${res.data?.ticket?.number}`);
                navigation.navigate("Home")
            }).catch((error) => {
                // console.log(error.response.data);
            })



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
                <ScrollView>
                    <View>
                        <Text style={{
                            fontFamily: "Inter_500Medium",
                            marginVertical: 15,
                            color: `${Colors.black}`,
                            textAlign: "center"
                        }}>This section is for the customer</Text>
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

                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 8 }}>
                            <Text style={{
                                paddingVertical: 10,
                                fontFamily: "Inter_400Regular",
                                color: `${Colors.black}`
                            }}>Does your phone require backup?(If no, leave unchecked)</Text>
                            <Checkbox value={isBackUpNeedCheckboxEnabled} onValueChange={toggleBackupNeededCheckbox} />
                        </View>

                        <Text style={{
                            fontFamily: "Inter_500Medium",
                            marginVertical: 15,
                            color: `${Colors.black}`,
                            textAlign: "center"
                        }}>Please let the booking agent fill in this section</Text>

                        <View
                            style={
                                styles.textInputWithButtonFlexed
                            }
                        >
                            <TextInput
                                placeholder='Please fill in IMEI'
                                placeholderTextColor={`${Colors.grey}`}
                                style={styles.textInputWithButtonFlexedInput}
                                editable={true}
                                value={IMEI}
                                onChangeText={e => setIMEI(e)}
                                keyboardType='numeric'
                            />
                            <Pressable onPress={() => setImeiScanOpen(!imeiScanOpen)}>
                                <Text style={{
                                    fontFamily: "Inter_500Medium",
                                }}>Scan</Text>
                            </Pressable>
                        </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={imeiScanOpen}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setImeiScanOpen(!imeiScanOpen);
                            }}>


                            <View style={{
                                justifyContent: "space-between",
                                flex: 1,
                                padding: 10
                            }}>
                                <CameraView
                                    focusable
                                    style={{ flex: 1 }}
                                    barCodeScannerSettings={{
                                        barCodeTypes: ["qr", 'aztec', 'ean13', 'ean8', 'qr', 'pdf417', 'upc_e', 'datamatrix', 'code39', 'code93', 'itf14', 'codabar', 'code128', 'upc_a'],
                                    }}
                                    onBarcodeScanned={(BarcodeScanningResult) => {
                                        setIMEI(BarcodeScanningResult.data);
                                        // console.log(BarcodeScanningResult.data)
                                        // console.log(BarcodeScanningResult.type)
                                    }}
                                    facing={facing}>

                                </CameraView>
                                <View style={{
                                    padding: 20,
                                    display: "flex",
                                    gap: 20,
                                    justifyContent: "center",
                                    backgroundColor: "#fff"

                                }}>
                                    <Text style={{
                                        fontFamily: "Inter_500Medium",
                                        color: `${Colors.grey}`,
                                        fontSize: 14,
                                        textAlign: "center"
                                    }}>{IMEI ? IMEI : ""}</Text>
                                    <Pressable
                                        onPress={() => setImeiScanOpen(!imeiScanOpen)}>
                                        <Text style={{
                                            textAlign: "center", fontFamily: "Inter_500Medium",
                                            color: `${Colors.grey}`,
                                        }}>Close</Text>
                                    </Pressable>
                                </View>

                            </View>

                        </Modal>

                        <View
                            style={styles.textInputWithButtonFlexed}
                        >
                            <TextInput
                                placeholder='Please fill in Model'
                                placeholderTextColor={`${Colors.grey}`}
                                style={styles.textInputWithButtonFlexedInput}
                                editable={true}
                                value={modelNumber}
                                onChangeText={e => setModelNumber(e)}
                            />
                            <Pressable onPress={() => setModelScanOpen(!modelScanOpen)}>
                                <Text style={{
                                    fontFamily: "Inter_500Medium",
                                }}>Scan</Text>
                            </Pressable>
                        </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modelScanOpen}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setModelScanOpen(!modelScanOpen);
                            }}>


                            <View style={{
                                justifyContent: "space-between",
                                flex: 1,
                                padding: 10
                            }}>
                                <CameraView
                                    focusable
                                    style={{ flex: 1 }}
                                    barCodeScannerSettings={{
                                        barCodeTypes: ["qr", 'aztec', 'ean13', 'ean8', 'qr', 'pdf417', 'upc_e', 'datamatrix', 'code39', 'code93', 'itf14', 'codabar', 'code128', 'upc_a'],
                                    }}
                                    onBarcodeScanned={(BarcodeScanningResult) => {
                                        setModelNumber(BarcodeScanningResult.data);
                                        // console.log(BarcodeScanningResult.data)
                                        // console.log(BarcodeScanningResult.type)
                                    }}
                                    facing={facing}>

                                </CameraView>
                                <View style={{
                                    padding: 20,
                                    display: "flex",
                                    gap: 20,
                                    justifyContent: "center",
                                    backgroundColor: "#fff"

                                }}>
                                    <Text style={{
                                        fontFamily: "Inter_500Medium",
                                        color: `${Colors.grey}`,
                                        fontSize: 14,
                                        textAlign: "center"
                                    }}>{modelNumber ? modelNumber : ""}</Text>
                                    <Pressable
                                        onPress={() => setModelScanOpen(!modelScanOpen)}>
                                        <Text style={{
                                            textAlign: "center", fontFamily: "Inter_500Medium",
                                            color: `${Colors.grey}`,
                                        }}>Close</Text>
                                    </Pressable>
                                </View>

                            </View>

                        </Modal>
                        <View
                            style={styles.textInputWithButtonFlexed}
                        >
                            <TextInput
                                placeholder='Please fill in Serial'
                                placeholderTextColor={`${Colors.grey}`}
                                style={styles.textInputWithButtonFlexedInput}
                                editable={true}
                                value={serialNumber}
                                onChangeText={e => setSerialNumber(e)}
                            />
                            <Pressable onPress={() => setserialNumberScanOpen(!serialNumberScanOpen)}>
                                <Text style={{
                                    fontFamily: "Inter_500Medium",
                                }}>Scan</Text>
                            </Pressable>
                        </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={serialNumberScanOpen}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setserialNumberScanOpen(!serialNumberScanOpen);
                            }}>


                            <View style={{
                                justifyContent: "space-between",
                                flex: 1,
                                padding: 10
                            }}>
                                <CameraView
                                    focusable
                                    style={{ flex: 1 }}
                                    barCodeScannerSettings={{
                                        barCodeTypes: ["qr", 'aztec', 'ean13', 'ean8', 'qr', 'pdf417', 'upc_e', 'datamatrix', 'code39', 'code93', 'itf14', 'codabar', 'code128', 'upc_a'],
                                    }}
                                    onBarcodeScanned={(BarcodeScanningResult) => {
                                        setSerialNumber(BarcodeScanningResult.data);
                                        // console.log(BarcodeScanningResult.data)
                                        // console.log(BarcodeScanningResult.type)
                                    }}
                                    facing={facing}>

                                </CameraView>
                                <View style={{
                                    padding: 20,
                                    display: "flex",
                                    gap: 20,
                                    justifyContent: "center",
                                    backgroundColor: "#fff"

                                }}>
                                    <Text style={{
                                        fontFamily: "Inter_500Medium",
                                        color: `${Colors.grey}`,
                                        fontSize: 14,
                                        textAlign: "center"
                                    }}>{serialNumber ? serialNumber : ""}</Text>
                                    <Pressable
                                        onPress={() => setserialNumberScanOpen(!serialNumberScanOpen)}>
                                        <Text style={{
                                            textAlign: "center", fontFamily: "Inter_500Medium",
                                            color: `${Colors.grey}`,
                                        }}>Close</Text>
                                    </Pressable>
                                </View>

                            </View>

                        </Modal>
                        {warranty ? <Text style={{
                            fontFamily: "Inter_500Medium",
                            color: `${Colors.black}`,
                            marginVertical: 6,
                            textAlign: "center"
                        }}>Unit is {warranty === "LP" ? "IW" : warranty}</Text> : ""}

                        <View
                            style={styles.textInputParent}
                        >
                            <TextInput
                                placeholder='Item condition'
                                placeholderTextColor={`${Colors.grey}`}
                                style={styles.textInput}
                                editable={true}
                                value={itemCondition}
                                onChangeText={e => setItemCondition(e)}
                            />
                        </View>
                        <Pressable onPress={() => setDateModalVisible(true)}><Text style={{
                            fontFamily: "Inter_500Medium",
                            color: `${Colors.blue}`,
                            marginVertical: 10
                        }}>Purchase date</Text></Pressable>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={dateModalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setDateModalVisible(!dateModalVisible);
                            }}>
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 22,
                            }}>
                                <View style={{
                                    margin: 20,
                                    backgroundColor: 'white',
                                    borderRadius: 20,
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
                                }}>
                                    <DateTimePicker
                                        mode="single"
                                        date={purchaseDate}
                                        onChange={(params) => setPurchaseDate(params?.date)}
                                    />
                                    <Pressable

                                        onPress={() => setDateModalVisible(!dateModalVisible)}>
                                        <Text>Close</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>


                        <CustomButton text="Create ticket"
                            fontSize={14}
                            buttonBgColor={`${Colors.lightBlue}`}
                            pressedButtonBgColor={`${Colors.blue}`} onPress={createTicket} />

                    </View>
                </ScrollView>
            </Container>

        </>
    )
}