import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from 'axios';
import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import CustomButton from '../../components/Button';
import Container from '../../components/Container';
import SectionHeaderTitle from '../../components/SectionHeaderTitle';
import { assetTypes } from '../../utils/assetTypes';
import { Colors } from '../../utils/colors';
import { faultOccurences } from '../../utils/faultOccurences';
import { datetimestamp } from '../../utils/timezone';


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
    const [ticketNumber, setTicketNumber] = useState<string | number>("")
    const { email, customUUID }: any = route?.params;


    const updateEntry = async () => {
        const updatedAt = datetimestamp;
        const values = {
            fault,
            faultOccurence,
            assetType,
            ticketNumber,
            updatedAt,
            customUUID
        }
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_LINK}/${customUUID}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            const data = await response.json()
        } catch (error) {

            // 
        }
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
                setTicketNumber(response.data?.ticket?.number)
                Alert.alert("Ticket created", `Here is your ticket: ${response.data?.ticket?.number}`)

            }
            updateEntry();
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
                <View
                    style={{
                        marginVertical: 4,
                    }}
                >
                    {/* <Text
                        style={{
                            fontFamily: "Inter_500Medium",
                            color: "#0d0d0d",
                            paddingVertical: 4,
                        }}
                    >
                        Fault
                    </Text> */}
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
                    <CustomButton text="Read our terms and conditions"
                        fontSize={14}
                        buttonBgColor={`${Colors.lightBlue}`}
                        pressedButtonBgColor={`${Colors.blue}`} onPress={() => {
                            navigation.navigate("Terms")
                        }} />
                    <CustomButton text="Create ticket"
                        fontSize={14}
                        buttonBgColor={`${Colors.lightBlue}`}
                        pressedButtonBgColor={`${Colors.blue}`} onPress={createTicket} />
                </View>



                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 8 }}>
                    <Text>Does your phone require backup?(If no, leave unchecked)</Text>
                    <Checkbox value={isBackUpNeedCheckboxEnabled} onValueChange={setIsBackUpNeedCheckboxEnabled} />
                </View>


            </Container>
        </>
    )
}