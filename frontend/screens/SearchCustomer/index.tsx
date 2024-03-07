import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from 'axios';
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import CustomButton from '../../components/Button';
import useDebounce from '../../hooks/useDebounce';
import { Colors } from '../../utils/colors';
import { datetimestamp } from '../../utils/timezone';


type TSearchCustomer = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    mobile: string;
}

export default function SearchCustomer() {
    const [searchCustomer, setSearchCustomer] = useState("");
    const [result, setResult] = useState<TSearchCustomer[]>([]);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [zip, setZip] = useState("");
    const debouncedCustomerSearch = useDebounce(searchCustomer, 400);
    // Navigation hook
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const customUUID = Crypto.randomUUID();

    useEffect(() => {
        checkIfCustomerWasHere()
    }, [searchCustomer])
    const checkIfCustomerWasHere = async () => {

        try {
            const { data } = await axios.get(`${process.env.EXPO_PUBLIC_REPAIRSHOPR_API_SUBDOMAIN}/customers?query=${searchCustomer}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.EXPO_PUBLIC_REPAIRSHOPR_BEARER_TOKEN}`
                },
            })
            if (data?.customers[0]?.email === searchCustomer) {
                setResult(data?.customers)
                setFirstname(data?.customers[0]?.firstname)
                setLastname(data?.customers[0]?.lastname)
                setEmail(data?.customers[0]?.email)
                setPhoneNumber(data?.customers[0]?.mobile)
                setAddress1(data?.customers[0]?.address)
                setAddress2(data?.customers[0]?.address_2)
                setCity(data?.customers[0]?.city)
                setProvince(data?.customers[0]?.state)
                setZip(data?.customers[0]?.zip)

            }
        } catch (error) {
            //    
        }

    }
    const createEntry = async () => {
        const createdAt = datetimestamp;

        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_LINK}/entry`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstname, lastname, email, phoneNumber, createdAt, customUUID
                })
            })
            const data = await response.json;
        } catch (error) {
            //    
        }
    }

    const addExistingCustomer = async () => {
        await SecureStore.setItemAsync("email", searchCustomer);
        createEntry();
        navigation.navigate("DeviceInspection", {
            email: searchCustomer,
            customUUID: customUUID
        });
    }

    return (
        <View style={{
            flex: 1,
            padding: 10,
            backgroundColor: "#fff",
            justifyContent: 'center',
            gap: 10
        }}>
            <View

            >
                <Text
                    style={{
                        fontFamily: "Inter_600SemiBold",
                        color: `${Colors.black}`,
                        paddingVertical: 4,
                        fontSize: 22,
                        textAlign: "center",
                        marginVertical: 10
                    }}
                >
                    Search using email
                </Text>
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
                    value={searchCustomer}
                    onChangeText={text => setSearchCustomer(text)}
                    editable={true}
                    placeholder='example@example.com'
                    keyboardType='email-address'
                    maxLength={100}

                />
            </View>
            <View>
                {
                    result && (
                        result.map((x) => (
                            <View
                                key={x.id}
                                style={{
                                    marginVertical: 4,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Inter_500Medium",
                                        color: `${Colors.blue}`,
                                        paddingVertical: 4,
                                        textAlign: "center"
                                    }}
                                >
                                    {x.email}
                                </Text>
                            </View>
                        ))
                    )
                }
                {result && <CustomButton text="Add customer"
                    fontSize={14}
                    buttonBgColor={`${Colors.lightBlue}`}
                    pressedButtonBgColor={`${Colors.blue}`} onPress={addExistingCustomer} />}
            </View>
        </View>
    )
}