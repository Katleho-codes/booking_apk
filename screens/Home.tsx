import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import Container from '../components/Container'
import { getCustomerRepairshpr } from '../hooks/useRepairApi'
import useDebounce from '../hooks/useDebounce'


export default function Home() {
    const [searchCustomer, setSearchCustomer] = useState("")
    const debouncedCustomerSearch = useDebounce(searchCustomer, 400);

    const { searchedCustomerFirstname, searchedCustomerLastname, searchedCustomerEmail, searchedCustomerMobile, searchedCustomerAddress, searchedCustomerAddressTwo, searchedCustomerCity, searchedCustomerProvince, searchedCustomerZip } = getCustomerRepairshpr({ debouncedCustomerSearch })

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
                    placeholder='Please search using email'
                    style={{
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        paddingVertical: 12,
                        borderColor: "#eee",
                        borderRadius: 2,
                        fontFamily: "Inter_500Medium",
                        width: "100%",
                    }}
                    value={searchCustomer?.toLowerCase()}
                    onChangeText={text => setSearchCustomer(text)}
                    editable={true}

                />
            </View>
            {searchedCustomerEmail && searchCustomer?.toLowerCase() === searchedCustomerEmail ? (
                <View>
                    <Text>{searchedCustomerEmail}</Text>
                </View>

            ) : ""}

            
        </Container>
    )
}