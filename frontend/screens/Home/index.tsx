
import React, { useState } from 'react'
import Container from '../../components/Container'
import useDebounce from '../../hooks/useDebounce'

import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Dimensions, Image, StatusBar, Text, View } from 'react-native'
import Animated, { FadeInDown, FadeInLeft, FadeOut } from 'react-native-reanimated'
import CustomButton from '../../components/Button'
import { Colors } from '../../utils/colors'



export default function Home() {
    const [searchCustomer, setSearchCustomer] = useState("")
    const debouncedCustomerSearch = useDebounce(searchCustomer, 400);
    // const [isModalVisible, setIsModalVisible] = useState(false)

    // Navigation hook
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const GotoNext = async () => {
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
                    <Animated.View entering={FadeInLeft} exiting={FadeOut}>
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
                    </Animated.View>
                    <Animated.View entering={FadeInDown} style={{
                        marginVertical: 8
                    }}>
                        <CustomButton
                            onPress={GotoNext}
                            text="Start process"
                            fontSize={14}
                            buttonBgColor={`${Colors.lightBlue}`}
                            pressedButtonBgColor={`${Colors.blue}`}
                        />
                    </Animated.View>
                </View>
            </Container>
        </>

    )
}

