import { View, Text, Switch, ScrollView } from 'react-native'
import React from 'react'
import { useBackupRestoreTermsAndConditions } from '../../hooks/useTermsAndConditions';

import { Colors } from '../../utils/colors';
import SectionHeaderTitle from '../../components/SectionHeaderTitle';



export default function BackupTerms() {
    const { backupTermsAndConditions } = useBackupRestoreTermsAndConditions()
    return (
        <ScrollView>
            <SectionHeaderTitle title='Data backup and restore advisory' />
            {
                backupTermsAndConditions.map((item, index) => (
                    <View key={item.term_id} >
                        <Text style={{
                            paddingVertical: 10,
                            fontFamily: `${item.is_bold === true || item.is_bold === "true" ? "Inter_500Medium" : "Inter_400Regular"}`,
                            color: `${Colors.black}`
                        }}>{index + 1}.  {item.term_description}</Text>
                    </View>
                ))
            }
            {/* <Checkbox color={`${Colors.lightBlue}`} value={pointOneChecked} onValueChange={setIsPointOneChecked} /> */}
        </ScrollView>
    )
}