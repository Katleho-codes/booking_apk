import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import CustomButton from '../../components/Button';
import Container from '../../components/Container';
import Header from '../../components/Header';
import { Colors } from '../../utils/colors';
import { provinces } from "../../utils/provinces";
import { datetimestamp } from '../../utils/timezone';


export default function CustomerDetails() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [provinceFocus, setProvinceFocus] = useState(false)
    const [zip, setZip] = useState("");

    // Navigation hook
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const customUUID = Crypto.randomUUID();
    const createEntry = async () => {
        const createdAt = datetimestamp;
        const values = {
            firstname,
            lastname,
            email,
            phoneNumber,
            address1,
            address2,
            city,
            province,
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
                    "address": address1,
                    "address_2": address2,
                    "city": city,
                    "state": province,
                    "zip": zip,
                })
            })
            const data = await response.json;
            await SecureStore.setItemAsync("email", email);
            createEntry();
            navigation.navigate("DeviceInspection", {
                email: email, firstname: firstname, lastname: lastname, createdAt: datetimestamp, phoneNumber: phoneNumber,
                customUUID: customUUID
            });
        } catch (error) {
            //   
        }

    }
    return (
        <>
            <Header text={"Customer Details"} />
            <Container>
                <ScrollView>

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
                    First name
                </Text> */}
                        <TextInput

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
                            value={firstname}
                            onChangeText={e => setFirstname(e)}
                            placeholder='First name'
                            placeholderTextColor={`${Colors.grey}`}
                            maxLength={100}
                            keyboardType="default"
                        />
                    </View>
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
                                fontFamily: "Inter_500Medium",
                                width: "100%",
                            }}
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
                                fontFamily: "Inter_500Medium",
                                width: "100%",
                            }}
                            editable={true}
                            value={email}
                            onChangeText={e => setEmail(e)}
                            placeholder='Email address'
                            placeholderTextColor={`${Colors.grey}`}
                            maxLength={100}
                            keyboardType="email-address"
                        />
                    </View>
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
                                fontFamily: "Inter_500Medium",
                                width: "100%",
                            }}
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
                                fontFamily: "Inter_500Medium",
                                width: "100%",
                            }}
                            editable={true}
                            value={address1}
                            onChangeText={e => setAddress1(e)}
                            placeholder='Address Line 1'
                            placeholderTextColor={`${Colors.grey}`}
                            maxLength={100}
                            keyboardType="default"
                        />
                    </View>
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
                                fontFamily: "Inter_500Medium",
                                width: "100%",
                            }}
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
                                fontFamily: "Inter_500Medium",
                                width: "100%",
                            }}
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
                                provinceFocus && { borderColor: `${Colors.blue}` },
                            ]}

                            // iconStyle={mainStyles.iconStyle}
                            fontFamily='Inter_400Regular'
                            data={provinces}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!provinceFocus ? "Select province" : "..."}
                            searchPlaceholder="Search..."
                            value={province}
                            onFocus={() => setProvinceFocus(true)}
                            onBlur={() => setProvinceFocus(false)}
                            onChange={(item: any) => {
                                setProvince(item.value);
                                setProvinceFocus(false);
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
                        <TextInput
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
                            value={province}
                            onChangeText={e => setProvince(e)}
                            placeholder='Province'
                            placeholderTextColor={`${Colors.grey}`}
                            maxLength={100}
                            keyboardType="default"
                        />
                    </View>
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
                                fontFamily: "Inter_500Medium",
                                width: "100%",
                            }}
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