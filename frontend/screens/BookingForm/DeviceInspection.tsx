import { View, Text, StatusBar, TextInput, ScrollView } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import { Dropdown } from 'react-native-element-dropdown';
import SectionHeaderTitle from '../../components/SectionHeaderTitle';
import { Colors } from '../../utils/colors';



type TDeviceInspection = {
    fault: string;
    setFault: (e: string) => void;
    faultOccurence: string;
    setFaultOccurence: (e: string) => void;
    faultOccurenceFocus: boolean;
    setFaultOccurenceFocus: (e: boolean) => void;
    assetType: string;
    setAssetType: (e: string) => void;
    isAssetDropdownFocus: boolean;
    setIsAssetDropdownFocus: (e: boolean) => void;
}

export default function DeviceInspection({ fault, setFault, faultOccurence, setFaultOccurence, faultOccurenceFocus, setFaultOccurenceFocus, isAssetDropdownFocus, setIsAssetDropdownFocus, assetType, setAssetType }: TDeviceInspection) {
    const faultOccurences = [
        { label: "Often", value: "Often" },
        { label: "Sometimes", value: "Sometimes" },
        { label: "Always", value: "Always" },
    ]

    const assetTypes = [
        { label: "TV/Monitor/Soundbar/Projector/Bluray", value: "TV/Audio" },
        { label: "Washing machine/Fridge/Microwave/Ovens", value: "Home Appliances" },
        { label: "Phone, tablet, buds, smart watch", value: "HHP" },
    ]

    return (
        <>
            <StatusBar />
            <ScrollView><Container>
                <SectionHeaderTitle title='Device Inspection' />

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
                        Fault
                    </Text> */}
                    <TextInput
                        placeholder='Fault description'
                        placeholderTextColor={`${Colors.grey}`}
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
                        value={fault}
                        onChangeText={setFault}
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
                            faultOccurenceFocus && { borderColor: `${Colors.blue}` },
                        ]}

                        // iconStyle={mainStyles.iconStyle}
                        fontFamily='Inter_400Regular'
                        data={faultOccurences}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!faultOccurenceFocus ? "How/When does the fault occur?" : "..."}
                        searchPlaceholder="Search..."
                        value={faultOccurence}
                        onFocus={() => setFaultOccurenceFocus(true)}
                        onBlur={() => setFaultOccurenceFocus(false)}
                        onChange={(item: any) => {
                            setFaultOccurence(item.value);
                            setFaultOccurenceFocus(false);
                        }}
                        itemTextStyle={{
                            fontFamily: "Inter_500Medium",
                            color: "#0d0d0d",
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
            </Container></ScrollView>
        </>
    )
}