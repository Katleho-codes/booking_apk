import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../../utils/colors'


type TBoldText = {
    text: string;
}
function BoldText({ text }: TBoldText) {
    return (
        <Text style={{ fontFamily: "Inter_600SemiBold", color: `${Colors.black}` }}>
            {text}
        </Text>
    )
}
function NormalText({ text }: TBoldText) {
    return (
        <Text style={{ fontFamily: "Inter_400Regular", color: `${Colors.black}`, paddingVertical: 10 }}>
            {text}
        </Text>
    )
}
export default function Policy() {
    return (
        <View style={{
            flex: 1,
            backgroundColor: `${Colors.white}`,
            padding: 10,
        }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{
                backgroundColor: `${Colors.white}`,
            }}>
                <Text style={{
                    fontFamily: "Inter_600SemiBold",
                    color: `${Colors.grey}`,
                    fontSize: 20,
                    margin: 0
                }}>Terms and conditions</Text>
                <NormalText text='In order to protect your property, repairs will only be returned upon presentation of your receipt.' />
                <NormalText text='When handing over your product for repair, please remove your SIM card, battery, charger, and all accessories.' />
                <NormalText text='Samsung and/or its accredited service center(s) will not be held liable for any loss incurred as a result of robbery or forced entry to our premises.' />
                <BoldText text='Any repairs not collected within 30 days of repair completion, after notification to the customer, will be sold to defray expenses.' />
                <NormalText text='Samsung and/or its service center will be deemed authorized to undertake any repairs should the cost be less than the minimum amount of a quotation.' />
                <BoldText text='This service order / job card DOES NOT AUTHORIZE ANY EXCHANGE OF YOUR DEVICE. All exchanges for a device must be authorized separately in writing by Samsung. Any handwritten notes made on this service order S.O. or job card that provide for an exchange for your device that is granted verbally by Samsung and/or its Authorized Service Centre are not permitted, and an exchange of your device will not be provided in such instances.' />
                <NormalText text='Once the quotation is accepted by yourself, Samsung and/or its accredited service Centre will be deemed authorized to replace parts and materials as may be necessary, provided the costs do not exceed the value of the quotation provided.' />
                <BoldText text='A minimum assessment/quotation rejection fee of R250 will be charged on all repairs that are not covered by the manufacturer warranty terms and conditions.' />
                <NormalText text="Repairs to liquid- or corrosion-damaged products will not be repaired under warranty conditions. This is specified within the owner' s manual warranty terms and conditions. Repair, however, can be offered at a cost to you, the end-user." />
                <NormalText text='All non-warranty repairs are on a C.O.D. (cash on delivery) basis. Samsung and/or its Authorized Service Centre will not dispatch any product repaired until payment in respect of such repairs has been received in full. Payment can be made either by cash or credit card; no cheques will be accepted.' />
                <NormalText text='All repairs undertaken, save those in respect of corrosion, physical damage, and/or liquid damage, are guaranteed against faulty workmanship for a maximum period of 90 days from the date of receipt by the customer.' />
                <BoldText text='Samsung and/or its Authorized Service Centre will not be held responsible for the loss of any data on any phone handed in for repair. It is your responsibility to ensure that all data is backed up safely.' />
                <NormalText text='Upon signature of this document and/or any document to which this document is attached shall signify your acceptance of the terms thereof.' />
            </ScrollView>
        </View>
    )
}