import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../../utils/colors'
import Checkbox from 'expo-checkbox';
import CustomButton from '../../components/Button';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from '../../components/Header';

type TBackupTerms = {
    isBackUpPriceAgreed: boolean;
    setIsBackUpPriceAgreed: (e: boolean) => void;
}

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
        <Text style={{ fontFamily: "Inter_400Regular", color: `${Colors.black}`, }}>
            {text}
        </Text>
    )
}
export default function BackupTerms() {
    // Navigation hook
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    function goBack() {
        navigation.goBack()
    }
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
                    margin: 0,
                }}>Data backup & Restore Advisory</Text>
                <NormalText text='(Option to have your data backed up and restored: cellphones, notes, and tablets)' />
                <View style={{
                    paddingVertical: 10
                }}>
                    <BoldText text='This advisory is applicable to cellular devices only and not to units such as notebooks, PCs, etc.' />
                </View>
                <NormalText text="Please note that software data backup and restore procedures are not covered under Samsung's warranty policies; thus, this portion of the repair can be performed, but on a chargeable basis" />
                <View style={{
                    paddingVertical: 10
                }}>
                    <BoldText text='Should the repair to your device entail a software reload or main board replacement, STORED DATA WILL BE LOST!' />
                    <Text>If we are able to access the defective device's data, we can attempt to back up and restore your data. Data includes contacts, media, and documents, which may be backed up and restored if accessible and if not corrupted.</Text>

                </View>
                <View style={{
                    paddingVertical: 10
                }}>
                    <BoldText text='We do not back up and restore any non-factory standard applications, 3rd party applications (such as WhatsApp), programs, Microsoft, or other Office suites.' />
                    <NormalText text='These will have to be uploaded and/or reinstalled yourself.' />
                </View>
                <View style={{
                    paddingVertical: 10
                }}>
                    <BoldText text='Service fee to undertake Data Backup and Restore - R550' />
                </View>
                <Text style={{
                    paddingVertical: 10, fontFamily: "Inter_400Regular", color: `${Colors.black}`
                }}>Please note that the above relates specifically to devices that require resolutions whereby the store data may be affected in order to affect a successful repair. Should the repair be of such nature that the stored data will not be affected (e.g., LCD, battery replacement, etc.), then there's no backup and restore procedure required, and the service fee is then not applicable.</Text>
                <Text style={{
                    paddingVertical: 10, fontFamily: "Inter_400Regular", color: `${Colors.black}`
                }}>Although extreme care and all efforts are taken in order not to lose any data, neither Samsung nor its contracted service agent can be held unconditionally responsible and/or liable if your data is irretrievable, lost or corrupted during the repair process and/or backup and restore procedures.</Text>
                <Text style={{
                    paddingVertical: 10, fontFamily: "Inter_400Regular", color: `${Colors.black}`
                }}>As these procedures can take up to 3–5 hours, we recommend that you leave your device with us to allow enough time for the above to be performed in the proper manner.
                </Text>
                <Text style={{
                    paddingVertical: 10, fontFamily: "Inter_400Regular", color: `${Colors.black}`
                }}>There is no charge (for backup and restore) should your data be irretrievable, if we are unable to successfully perform the backup and restore processes, or if the repair is not software or mainboard-related.</Text>

                <Text>Should the quote not be accepted and the repair resolution is to undertake the required repairs to the device on a no-charge basis, all your stored data will be lost in the process. The above terms and conditions are applicable to devices that are in and out of warranty. However, should your device be out of warranty and have additional hardware-related faults, you will be quoted once the unit has undergone a technical assessment.</Text>
                <Text style={{
                    paddingVertical: 10, fontFamily: "Inter_400Regular", color: `${Colors.black}`
                }}>However, should your device be out of warranty and have additional hardware-related faults, you will be quoted once the unit has undergone a technical assessment.</Text>

                {/* <View>
                <Text>Yes, I understand the above advisory and hereby agree and instruct that backup and restore procedures can be undertaken if required and if possible. I also agree to pay the service fee as stipulated above. If No, leave unchecked</Text>
                <Checkbox value={isBackUpPriceAgreed} onValueChange={setIsBackUpPriceAgreed} />
            </View> */}

            </ScrollView>
        </View>
    )
}