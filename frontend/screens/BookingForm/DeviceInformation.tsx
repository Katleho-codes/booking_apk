import { View, Text, TextInput, Switch, Button, ScrollView, Pressable } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react';
import { Dropdown } from "react-native-element-dropdown";
import CustomModal from '../../components/CustomModal';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import CustomButton from '../../components/Button';
import { Colors } from '../../utils/colors';
import SectionHeaderTitle from '../../components/SectionHeaderTitle';

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
    isBackUpNeedSwitchEnabled: boolean;
    setIsBackUpNeedSwitchEnabled: (e: boolean) => void;
}


const assetTypes = [
    { label: "TV/Monitor/Soundbar/Projector/Bluray", value: "TV/Audio" },
    { label: "Washing machine/Fridge/Microwave/Ovens", value: "Home Appliances" },
    { label: "Phone, tablet, buds, smart watch", value: "HHP" },
]

export default function DeviceInformation({ model, setModel, make, setMake, serialNumber, setSerialNumber, imei, setImei, isAssetDropdownFocus, setIsAssetDropdownFocus, assetType, setAssetType, isBackUpNeedSwitchEnabled, setIsBackUpNeedSwitchEnabled }: TDeviceInformation) {
    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const openModelScanner = async () => {
        // console.log("clicked")
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
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
                    <Pressable onPress={openModelScanner} style={{
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
                    <Pressable onPress={openModelScanner} style={{
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
                    <Pressable onPress={openModelScanner} style={{
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
                            isAssetDropdownFocus && { borderColor: "blue" },
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
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isBackUpNeedSwitchEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={setIsBackUpNeedSwitchEnabled}
                        value={isBackUpNeedSwitchEnabled}
                    />
                </View>

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
                                <Text>Awesome 🎉</Text>
                            </BottomSheetView>
                        </BottomSheetModal>
                    </View>
                </BottomSheetModalProvider>
            </ScrollView>
        </GestureHandlerRootView >
    )
}