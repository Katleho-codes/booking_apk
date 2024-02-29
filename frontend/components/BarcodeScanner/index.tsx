import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Container from '../Container'
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera/next';
export default function BarcodeScanner() {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) { }

    if (!permission?.granted) { }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <Container>

            <CameraView
                focusable

                barCodeScannerSettings={{
                    barCodeTypes: ["qr", 'aztec', 'ean13', 'ean8', 'qr', 'pdf417', 'upc_e', 'datamatrix', 'code39', 'code93', 'itf14', 'codabar', 'code128', 'upc_a'],
                }}
                onBarcodeScanned={(BarcodeScanningResult) => {
                    console.log(BarcodeScanningResult.data)
                    // console.log(BarcodeScanningResult.type)
                }}
                style={{
                    flex: 1
                }} facing={facing}>
                <View >
                    <TouchableOpacity onPress={toggleCameraFacing}>
                        <Text>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>

        </Container>
    )
}