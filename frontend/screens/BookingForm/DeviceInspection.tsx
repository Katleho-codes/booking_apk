import { View, Text, StatusBar, TextInput, ScrollView } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import { Dropdown } from 'react-native-element-dropdown';
import SectionHeaderTitle from '../../components/SectionHeaderTitle';



type TDeviceInspection = {
    fault: string;
    setFault: (e: string) => void;
    faultOccurence: string;
    setFaultOccurence: (e: string) => void;
    faultOccurenceFocus: boolean;
    setFaultOccurenceFocus: (e: boolean) => void;

}

export default function DeviceInspection({ fault, setFault, faultOccurence, setFaultOccurence, faultOccurenceFocus, setFaultOccurenceFocus }: TDeviceInspection) {
    const faultOccurences = [
        { label: "Often", value: "Often" },
        { label: "Sometimes", value: "Sometimes" },
        { label: "Always", value: "Always" },
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
                    <Text
                        style={{
                            fontFamily: "Inter_500Medium",
                            color: "#0d0d0d",
                            paddingVertical: 4,
                        }}
                    >
                        Fault
                    </Text>
                    <TextInput
                        placeholder='Fault description'
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
                            faultOccurenceFocus && { borderColor: "blue" },
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
                    />
                </View>
            </Container></ScrollView>
        </>
    )
}