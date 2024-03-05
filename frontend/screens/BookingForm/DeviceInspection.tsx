import { View, Text, StatusBar, TextInput, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import { Dropdown } from 'react-native-element-dropdown';
import SectionHeaderTitle from '../../components/SectionHeaderTitle';
import { Colors } from '../../utils/colors';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import CustomButton from '../../components/Button';



export default function DeviceInspection() {
    const faultOccurences = [
        { label: "Often", value: "Often" },
        { label: "Sometimes", value: "Sometimes" },
        { label: "Always", value: "Always" },
    ]

    const assetTypes = [
        { label: "TV/Monitor/Soundbar/Projector/Bluray", value: "TV/Audio" },
        { label: "Washing machine/Fridge/Microwave/Ovens", value: "Home Appliance" },
        { label: "Phone, tablet, buds, smart watch", value: "HHP(Mobile Phone/Tablets)" },
    ]
    const [model, setModel] = useState("")
    const [imei, setImei] = useState("")
    const [make, setMake] = useState("Samsung")
    const [serialNumber, setSerialNumber] = useState("")
    const [isAssetDropdownFocus, setIsAssetDropdownFocus] = useState(false)
    const [assetType, setAssetType] = useState("");
    const [isBackUpNeedCheckboxEnabled, setIsBackUpNeedCheckboxEnabled] = useState(false)


    const [fault, setFault] = useState("")
    const [faultOccurence, setFaultOccurence] = useState("")
    const [faultOccurenceFocus, setFaultOccurenceFocus] = useState(false)
    const route = useRoute();
    const [customerId, setCustomerId] = useState<any>("")
    const { email }: any = route?.params;

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
            console.log(error)
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
            console.log(response.data)
            if (response.data) {
                Alert.alert("Ticket created", `Here is your ticket: ${response.data?.ticket?.number}`)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <StatusBar />
            <ScrollView>
                <Container>
                    <SectionHeaderTitle title='Device Inspection' />
                    <Text>email: {email}</Text>
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
                            // search
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
                                color: "#0d0d0d",
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
                            search
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
                        />
                    </View>
                    <CustomButton text="Add customer"
                        fontSize={14}
                        buttonBgColor={`${Colors.lightBlue}`}
                        pressedButtonBgColor={`${Colors.blue}`} onPress={createTicket} />
                </Container>
            </ScrollView>
        </>
    )
}