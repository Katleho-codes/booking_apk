import { View, Text, TextInput, ScrollView } from 'react-native'
import React from 'react'
import SectionHeaderTitle from '../../components/SectionHeaderTitle';
import { Colors } from '../../utils/colors';


type TCustomerDetails = {
    firstname: string;
    setFirstname: (e: string) => void;
    lastname: string;
    setLastname: (e: string) => void;

    email: string;
    setEmail: (e: string) => void;

    address1: string;
    setAddress1: (e: string) => void;

    address2: string;
    setAddress2: (e: string) => void;

    city: string;
    setCity: (e: string) => void;

    province: string;
    setProvince: (e: string) => void;

    zip: string;
    setZip: (e: string) => void;

    businessName?: string;
    setBusinessname?: (e: string) => void;


}


export default function CustomerDetails({ firstname, setFirstname, lastname, setLastname, businessName, email, setEmail, address1, setAddress1, address2, setAddress2, city, setCity, province, setProvince, zip, setZip }: TCustomerDetails) {
    return (
        <ScrollView>
            <SectionHeaderTitle title='Customer Details' />
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
                    onChangeText={setFirstname}
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
                    onChangeText={setLastname}
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
                    onChangeText={setEmail}
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
                    value={address1}
                    onChangeText={setAddress1}
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
                    onChangeText={setAddress2}
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
                    onChangeText={setCity}
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
                    onChangeText={setProvince}
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
                    onChangeText={setZip}
                    keyboardType="numeric"
                    inputMode='numeric'
                    placeholder='Zip/Postal code'
                    placeholderTextColor={`${Colors.grey}`}
                />
            </View>

        </ScrollView>
    )
}