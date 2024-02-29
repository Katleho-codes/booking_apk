import { View, Text, TextInput, ScrollView } from 'react-native'
import React from 'react'
import SectionHeaderTitle from '../../components/SectionHeaderTitle';


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
                <Text
                    style={{
                        fontFamily: "Inter_500Medium",
                        color: "#0d0d0d",
                        paddingVertical: 4,
                    }}
                >
                    First name
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
                    editable={true}
                    value={firstname}
                    onChangeText={setFirstname}
                />
            </View>
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
                    Last name
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
                    editable={true}
                    value={lastname}
                    onChangeText={setLastname}
                />
            </View>
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
                    Email address
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
                    editable={true}
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
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
                    Address Line 1
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
                    editable={true}
                    value={address1}
                    onChangeText={setAddress1}
                />
            </View>
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
                    Address Line 2
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
                    editable={true}
                    value={address2}
                    onChangeText={setAddress2}
                />
            </View>
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
                    City
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
                    editable={true}
                    value={city}
                    onChangeText={setCity}
                />
            </View>
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
                    Province
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
                    editable={true}
                    value={province}
                    onChangeText={setProvince}
                />
            </View>
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
                    Zip/Postal code
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
                    editable={true}
                    value={zip}
                    onChangeText={setZip}
                    keyboardType="numeric"
                    inputMode='numeric'
                />
            </View>

        </ScrollView>
    )
}