import { View, Text, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Checkbox from 'expo-checkbox'
import SignatureScreen, {
    SignatureViewRef,
} from "react-native-signature-canvas";
import * as FileSystem from "expo-file-system";

type TSignTerms = {
    readTerms: boolean;
    setReadTerms: (e: boolean) => void;

}

export default function SignTerms({ readTerms, setReadTerms }: TSignTerms) {
    const [userSigature, setUserSignature] = useState("");
    const [signatureExists, setSignatureExists] = useState(false)
    // For terms and conditions
    const termsRef = useRef<SignatureViewRef>(null);


    const handleOK = (signature) => {
        const path = FileSystem.cacheDirectory + "sign.png";
        FileSystem.writeAsStringAsync(
            path,
            signature.replace("data:image/png;base64,", ""),
            { encoding: FileSystem.EncodingType.Base64 }
        )
            .then(() => FileSystem.getInfoAsync(path))
            .then(console.log)
            .catch(console.error);
    };

    const handleTermsSignatureOK = (signature: any) => {
        // console.log(signature);
        handleOK(signature); // Callback from Component props
        setUserSignature(signature)
        setSignatureExists(true)
    }


    // Called after ref.current.readSignature() reads an empty string
    const handleTermsSignatureEmpty = () => {
        console.log("Empty");
    };

    // Called after ref.current.clearSignature()
    const handleTermsSignatureClear = () => {
        console.log("clear success!");
    };

    // Called after end of stroke
    const handleTermsSignatureEnd = () => {
        termsRef?.current?.readSignature();
    };

    // Called after ref.current.getData()
    const handleData = (data: any) => {
        console.log(data);
    };

    return (
        <>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 8 }}>
                <Text>Do you agree with the terms and conditions?</Text>
                <Checkbox value={readTerms} onValueChange={setReadTerms} />
            </View>
            {readTerms === true ? <SignatureScreen
                ref={termsRef}
                onEnd={handleTermsSignatureEnd}
                onOK={handleTermsSignatureOK}
                onEmpty={handleTermsSignatureEmpty}
                onClear={handleTermsSignatureClear}
                onGetData={handleData}
                autoClear={true}
                descriptionText={"Signature pad"}
            /> : ""}
            <View>
                {signatureExists === true ? (
                    <Image
                        resizeMode={"contain"}
                        style={{ borderWidth: 1, height: 200 }}
                        source={{ uri: userSigature }}
                    />
                ) : null}
            </View>
        </>
    )
}