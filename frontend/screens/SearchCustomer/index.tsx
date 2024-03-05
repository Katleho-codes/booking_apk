import { View, Text, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../components/Container';
import useDebounce from '../../hooks/useDebounce';
import axios from 'axios';
import CustomButton from '../../components/Button';
import { Colors } from '../../utils/colors';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"



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
    const debouncedCustomerSearch = useDebounce(searchCustomer, 400);
    // Navigation hook
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const addExistingCustomer = async () => {
        await SecureStore.setItemAsync("email", searchCustomer);
        navigation.navigate("DeviceInspection", {
            email: searchCustomer
        });
    }
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
                // setFirstname(data?.customers[0]?.firstname)
                // setLastname(data?.customers[0]?.lastname)
                // setEmail(data?.customers[0]?.email)
                // setPhoneNumber(data?.customers[0]?.mobile)
                // setAddress1(data?.customers[0]?.address)
                // setAddress2(data?.customers[0]?.address_2)
                // setCity(data?.customers[0]?.city)
                // setProvince(data?.customers[0]?.state)
                // setZip(data?.customers[0]?.zip)

            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        checkIfCustomerWasHere()
    }, [searchCustomer])
    return (
        <Container>
            <View
                style={{
                    marginVertical: 4,
                }}
            >
                <Text
                    style={{
                        fontFamily: "Inter_500Medium",
                        color: "#0d0d0d",
                        paddingVertical: 4,
                    }}
                >
                    Search customer
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
                                        color: "#0d0d0d",
                                        paddingVertical: 4,
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
            {/* {result  ? (
                <>
                    <View>
                        <Text>{searchedCustomerFirstname} {searchedCustomerLastname}</Text>
                        <Text>{searchedCustomerMobile}</Text>
                        <Text>{searchedCustomerAddress} {searchedCustomerAddressTwo}</Text>
                        <Text>{searchedCustomerCity} {searchedCustomerProvince}</Text>
                        <Text>{searchedCustomerZip}</Text>
                    </View>

                    <Pressable>
                        <Text>Add</Text>
                    </Pressable>
                </>
            ) : ""} */}


        </Container>
    )
}