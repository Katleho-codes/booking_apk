import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Dropdown } from "react-native-element-dropdown";
import CustomButton from '../../components/Button';
import SectionHeaderTitle from '../../components/SectionHeaderTitle';
import { Colors } from '../../utils/colors';

type TDeviceInformation = {
    model: string;
    setModel: (e: string) => void;
    make: string;
    setMake: (e: string) => void;
    serialNumber: string;
    setSerialNumber: (e: string) => void;
    imei: string;
    setImei: (e: string) => void;
    assetType: string;
    setAssetType: (e: string) => void;
    isAssetDropdownFocus: boolean;
    setIsAssetDropdownFocus: (e: boolean) => void;
    isBackUpNeedCheckboxEnabled: boolean;
    setIsBackUpNeedCheckboxEnabled: (e: boolean) => void;

}


const assetTypes = [
    { label: "TV/Monitor/Soundbar/Projector/Bluray", value: "TV/Audio" },
    { label: "Washing machine/Fridge/Microwave/Ovens", value: "Home Appliances" },
    { label: "Phone, tablet, buds, smart watch", value: "HHP" },
]



export default function DeviceInformation({ model, setModel, make, setMake, serialNumber, setSerialNumber, imei, setImei, isAssetDropdownFocus, setIsAssetDropdownFocus, assetType, setAssetType, isBackUpNeedCheckboxEnabled, setIsBackUpNeedCheckboxEnabled }: TDeviceInformation) {
    // Navigation hook
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [isBackUpPriceAgreed, setIsBackUpPriceAgreed] = useState(false);

    const handlePresentModalPress = () => {
        navigation.navigate("BackupTerms")
    }

    return (

        <ScrollView>
            <SectionHeaderTitle title='Device Information' />
            <View
                style={{
                    marginVertical: 4,
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,

                    borderColor: "#eee",
                    borderRadius: 2,
                    width: "100%",

                }}
            >
                <TextInput
                    editable={false}
                    value={model}
                    onChangeText={setModel}
                    placeholder='Model'
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 12,
                        width: "100%"
                    }}

                />
                <Pressable onPress={() => { }} style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    right: 5,
                }}>
                    <Text>Scan</Text>
                </Pressable>
            </View>
            <View
                style={{
                    marginVertical: 4,
                }}
            >
                <TextInput
                    placeholder='Make'
                    style={{
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        paddingVertical: 12,
                        borderColor: "#eee",
                        borderRadius: 2,
                        fontFamily: "Inter_500Medium",
                        width: "100%",
                    }}
                    editable={false}
                    value={make}
                    onChangeText={setMake}
                />
            </View>
            <View
                style={{
                    marginVertical: 4,
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,

                    borderColor: "#eee",
                    borderRadius: 2,
                    width: "100%",

                }}
            >
                <TextInput
                    editable={false}
                    value={serialNumber}
                    onChangeText={setSerialNumber}
                    placeholder='Serial Number'
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 12,
                        width: "100%"
                    }}

                />
                <Pressable onPress={() => { }} style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    right: 5,
                }}>
                    <Text>Scan</Text>
                </Pressable>
            </View>
            <View
                style={{
                    marginVertical: 4,
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,

                    borderColor: "#eee",
                    borderRadius: 2,
                    width: "100%",

                }}
            >
                <TextInput
                    editable={false}
                    value={imei}
                    onChangeText={setImei}
                    placeholder='IMEI'
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 12,
                        width: "100%"
                    }}

                />
                <Pressable onPress={() => { }} style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    right: 5,
                }}>
                    <Text>Scan</Text>
                </Pressable>
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
                        isAssetDropdownFocus && { borderColor: `${Colors.blue}` },
                    ]}

                    // iconStyle={mainStyles.iconStyle}
                    fontFamily='Inter_400Regular'
                    data={assetTypes}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isAssetDropdownFocus ? "What are you booking?" : "..."}
                    searchPlaceholder="Search..."
                    value={assetType}
                    onFocus={() => setIsAssetDropdownFocus(true)}
                    onBlur={() => setIsAssetDropdownFocus(false)}
                    onChange={(item: any) => {
                        setAssetType(item.value);
                        setIsAssetDropdownFocus(false);
                    }}
                />
            </View>
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 4,

            }}>
                <Text style={{
                    fontFamily: "Inter_500Medium",
                    color: "#0d0d0d",
                    paddingVertical: 4,
                }}>Do you require backup for your device?</Text>
                <Checkbox color={isBackUpNeedCheckboxEnabled ? `${Colors.lightBlue}` : undefined} value={isBackUpNeedCheckboxEnabled} onValueChange={setIsBackUpNeedCheckboxEnabled} />

            </View>


            <View>
                <CustomButton
                    onPress={handlePresentModalPress}
                    text="backup terms and conditions"
                    fontSize={14}
                    buttonBgColor={`${Colors.black}`}
                    pressedButtonBgColor={`${Colors.lightGrey}`}
                />
                {/* <BackupTerms /> */}
            </View>

        </ScrollView>

    )
}