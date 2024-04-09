import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import * as Crypto from 'expo-crypto';
import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import CustomButton from '../../components/Button';
import Container from '../../components/Container';
import Header from '../../components/Header';
import { Colors } from '../../utils/colors';
import { provinces } from "../../utils/provinces";
import { datetimestamp } from '../../utils/timezone';
import { styles } from "./style";


export default function CustomerDetails() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [gspnProvince, setGSPNProvince] = useState("")
    const [provinceFocus, setProvinceFocus] = useState(false)
    const [zip, setZip] = useState("");

    const [searchCustomer, setSearchCustomer] = useState("");


    // Navigation hook
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const customUUID = Crypto.randomUUID();



    useEffect(() => {
        checkIfCustomerWasHere()
    }, [email])
    const checkIfCustomerWasHere = async () => {

        try {
            const { data } = await axios.get(`${process.env.EXPO_PUBLIC_REPAIRSHOPR_API_SUBDOMAIN}/customers?query=${email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.EXPO_PUBLIC_REPAIRSHOPR_BEARER_TOKEN}`
                },
            })
            // console.log(data)
            if (data?.customers[0]?.email === email) {
                // setResult(data?.customers)
                setFirstname(data?.customers[0]?.firstname)
                setLastname(data?.customers[0]?.lastname)
                setEmail(data?.customers[0]?.email)
                setPhoneNumber(data?.customers[0]?.mobile)

            }
        } catch (error) {
            //    
        }

    }
    const createEntry = async () => {
        const createdAt = datetimestamp;
        const values = {
            firstname,
            lastname,
            email,
            phoneNumber,
            address,
            address2,
            city,
            state,
            zip,
            createdAt,
            customUUID
        }
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_LINK}/entry`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(values)
            })
            const data = await response.json;
        } catch (error) {
            // 
        }
    }

    const createCustomer = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_REPAIRSHOPR_API_SUBDOMAIN}/customers`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.EXPO_PUBLIC_REPAIRSHOPR_BEARER_TOKEN}`
                },
                body: JSON.stringify({
                    "firstname": firstname,
                    "lastname": lastname,
                    "email": email,
                    "phone": phoneNumber,
                    "address": address,
                    "address_2": address2,
                    "city": city,
                    "state": state,
                    "zip": zip,
                })
            })
            const data = await response.json;
            createEntry();
            navigation.navigate("DeviceInspection", {
                email: email, firstname: firstname, lastname: lastname, createdAt: datetimestamp, phoneNumber: phoneNumber,
                customUUID: customUUID, provinceCode: gspnProvince, address: address, city: city, zip: zip
            });
        } catch (error) {
            //   
        }

    }
    return (
        <>
            <StatusBar />
            <Header text={"Customer Details"} />
            <Container>
                <ScrollView>

                    <View
                        style={styles.textInputParent}
                    >

                        <TextInput
                            style={styles.textInput}
                            editable={true}
                            value={firstname}
                            onChangeText={e => setFirstname(e)}
                            placeholder='First name'
                            placeholderTextColor={`${Colors.grey}`}
                            maxLength={100}
                            keyboardType="default"
                        />
                    </View>
                    <View
                        style={styles.textInputParent}
                    >

                        <TextInput
                            style={styles.textInput}
                            editable={true}
                            value={lastname}
                            onChangeText={e => setLastname(e)}
                            placeholder='Last name'
                            placeholderTextColor={`${Colors.grey}`}
                            maxLength={100}
                            keyboardType="default"
                        />
                    </View>
                    <View
                        style={styles.textInputParent}
                    >
                        <TextInput
                            style={styles.textInput}
                            editable={true}
                            value={email}
                            onChangeText={e => setEmail(e)}
                            placeholder='Email address'
                            placeholderTextColor={`${Colors.grey}`}
                            maxLength={100}
                            keyboardType="email-address"
                        />
                    </View>
                    <Text>Please fill in email first to check if you've been here</Text>
                    <View
                        style={styles.textInputParent}
                    >
                        <TextInput
                            style={styles.textInput}
                            editable={true}
                            value={phoneNumber}
                            onChangeText={e => setPhoneNumber(e)}
                            placeholder='Phone number'
                            placeholderTextColor={`${Colors.grey}`}
                            maxLength={100}
                            keyboardType="phone-pad"
                        />
                    </View>
                    <View
                        style={styles.textInputParent}
                    >
                        <TextInput
                            style={styles.textInput}
                            editable={true}
                            value={address}
                            onChangeText={e => setAddress(e)}
                            placeholder='Address Line 1'
                            placeholderTextColor={`${Colors.grey}`}
                            maxLength={100}
                            keyboardType="default"
                        />
                    </View>
                    <View
                        style={styles.textInputParent}
                    >
                        <TextInput
                            style={styles.textInput}
                            editable={true}
                            value={address2}
                            onChangeText={e => setAddress2(e)}
                            placeholder='Address Line 2'
                            placeholderTextColor={`${Colors.grey}`}
                            maxLength={100}
                            keyboardType="default"
                        />
                    </View>
                    <View
                        style={styles.textInputParent}
                    >
                        <TextInput
                            style={styles.textInput}
                            editable={true}
                            value={city}
                            onChangeText={e => setCity(e)}
                            placeholder='City'
                            placeholderTextColor={`${Colors.grey}`}
                            maxLength={100}
                            keyboardType="default"
                        />
                    </View>
                    <View
                        style={styles.textInputParent}
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
                                provinceFocus && { borderColor: `${Colors.blue}` },
                            ]}

                            // iconStyle={mainStyles.iconStyle}
                            fontFamily='Inter_400Regular'
                            data={provinces}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!provinceFocus ? "Select state" : "..."}
                            searchPlaceholder="Search..."
                            value={state}
                            onFocus={() => setProvinceFocus(true)}
                            onBlur={() => setProvinceFocus(false)}
                            onChange={(item: any) => {
                                setState(item.value);
                                setProvinceFocus(false);
                                setGSPNProvince(item.provinceCode)
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
                        style={styles.textInputParent}
                    >
                        <Text>{gspnProvince}</Text>
                    </View>
                    <View
                        style={styles.textInputParent}
                    >
                        <TextInput
                            style={styles.textInput}
                            editable={true}
                            value={zip}
                            onChangeText={e => setZip(e)}
                            keyboardType="numeric"
                            inputMode='numeric'
                            placeholder='Zip/Postal code'
                            placeholderTextColor={`${Colors.grey}`}
                            maxLength={5}
                        />
                    </View>
                </ScrollView>

                <CustomButton text='Create customer' buttonBgColor={`${Colors.blue}`} pressedButtonBgColor={`${Colors.lightBlue}`} onPress={createCustomer} fontSize={14} />
            </Container>
        </>
    )
}