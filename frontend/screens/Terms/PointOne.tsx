import React from 'react';
import { Text, View } from 'react-native';
import { useTermsAndConditions } from '../../hooks/useTermsAndConditions';
import { Colors } from '../../utils/colors';


export default function PointOne() {
    const { termsAndConditions } = useTermsAndConditions()
    let filtered = termsAndConditions.filter((item) => item.is_bold !== true)
    return (
        <View>

            {
                filtered.map((item, index) => (
                    <View key={item.term_id} >
                        <Text style={{
                            paddingVertical: 10,
                            fontFamily: "Inter_400Regular",
                            color: `${Colors.black}`
                        }}>{index + 1}.  {item.term_description}</Text>
                    </View>
                ))
            }
            {/* <Checkbox color={`${Colors.lightBlue}`} value={pointOneChecked} onValueChange={setIsPointOneChecked} /> */}
        </View >
    )
}