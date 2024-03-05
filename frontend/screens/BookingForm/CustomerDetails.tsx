import { View, Text, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import SectionHeaderTitle from '../../components/SectionHeaderTitle';
import { Colors } from '../../utils/colors';
import Container from '../../components/Container';
import Header from '../../components/Header';
import CustomButton from '../../components/Button';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"




export default function CustomerDetails() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [zip, setZip] = useState("");

    // Navigation hook
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const createEntry = async () => {

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
            // console.log("data", data);
            navigation.navigate("DeviceInspection", {
                email: email
            });
            // console.log("Customer created")
        } catch (error) {
            console.log('====================================');
            console.log("create customer error", error);
            console.log('====================================');
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
                        />
                    </View>
                </ScrollView>
                <CustomButton text='Create customer' buttonBgColor={`${Colors.blue}`} pressedButtonBgColor={`${Colors.lightBlue}`} onPress={createCustomer} />
            </Container>
        </>
    )
}