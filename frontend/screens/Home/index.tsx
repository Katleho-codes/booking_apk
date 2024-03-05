
import React, { useState } from 'react'
import Container from '../../components/Container'
import useDebounce from '../../hooks/useDebounce'

import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Dimensions, Image, StatusBar, Text, View } from 'react-native'
import CustomButton from '../../components/Button'
import { Colors } from '../../utils/colors'



export default function Home() {
    const [searchCustomer, setSearchCustomer] = useState("")
    const debouncedCustomerSearch = useDebounce(searchCustomer, 400);
    // const [isModalVisible, setIsModalVisible] = useState(false)

    // Navigation hook
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const GotoNext = async () => {
        // TODO: Uncomment then following code
        // The job status will always be "New" we don't need state for that, nor an input field
        // const unitStatus = "New"
        // const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_LINK}/entry`, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     unitStatus,
        // }).then(response => {
        //     console.log(response.data);
        // })
        //     .catch(function (error) {
        //         console.error("New entry error", error);
        //     });
        navigation.navigate("Prompts");
    }

    const windowHeight = Dimensions.get('window').width;
    const windowWidth = Dimensions.get('window').height;
    return (
        // <CustomModal
        //     onRequestClose={() => setIsModalVisible(false)}
        //     visible={isModalVisible}
        //     onHide={() => setIsModalVisible(false)}
        //     onShowModal={() => setIsModalVisible(true)}

        // />

        <>

            <StatusBar />
            <Container>


                <View style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <View>
                        <Text style={{
                            textAlign: "center",
                            fontSize: 18,
                            fontFamily: "Inter_200ExtraLight",
                            color: Colors.black,
                            marginBottom: 0,
                            textTransform: "uppercase"
                        }}>Welcome to</Text>
                        <View style={{
                            maxWidth: windowWidth,
                            overflow: "hidden",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginVertical: 0
                        }}>
                            <Image
                                style={{
                                    width: windowWidth / 2.5,
                                    height: windowHeight * 0.25,
                                    resizeMode: "contain",
                                    borderColor: "#ddd",

                                }}
                                resizeMode="contain"
                                source={require('../../assets/samsung_logo.png')}
                            />
                        </View>
                        <Text style={{
                            textAlign: "center",
                            fontSize: 18,
                            fontFamily: "Inter_300Light",
                            color: Colors.black,
                            margin: 0
                        }}>Customer Service</Text>
                        <Text style={{
                            textAlign: "center",
                            fontSize: 18,
                            fontFamily: "Inter_600SemiBold",
                            color: Colors.black,
                            margin: 0
                        }}>MM ALL Electronics</Text>
                    </View>
                    <View style={{
                        marginVertical: 8
                    }}>
                        <CustomButton
                            onPress={GotoNext}
                            text="Start process"
                            fontSize={14}
                            buttonBgColor={`${Colors.lightBlue}`}
                            pressedButtonBgColor={`${Colors.blue}`}
                        />
                    </View>
                </View>
            </Container>
        </>

    )
}

