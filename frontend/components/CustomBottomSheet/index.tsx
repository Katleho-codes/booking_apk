import { View, Text } from 'react-native'
import React from 'react'
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import CustomButton from '../../components/Button';
import { Colors } from '../../utils/colors';

type TCustomBottomSheet={
    
}
export default function CustomBottomSheet() {
    return (
        <BottomSheetModalProvider>
            <View>
                <CustomButton
                    onPress={handlePresentModalPress}
                    text="Read backup terms and conditions"
                    fontSize={14}
                    buttonBgColor={`${Colors.black}`}
                    pressedButtonBgColor={`${Colors.lightGrey}`}
                />
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    detached={true}
                >
                    <BottomSheetView style={{
                        flex: 1,
                        alignItems: 'center',
                    }}>
                     {children}
                    </BottomSheetView>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    )
}