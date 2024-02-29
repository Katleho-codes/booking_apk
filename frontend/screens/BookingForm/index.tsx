import { View, Text, TextInput, Pressable, StatusBar } from 'react-native'
import React, { useState } from 'react'
import Container from '../../components/Container'
import { getCustomerRepairshpr } from '../../hooks/useRepairApi'
import useDebounce from '../../hooks/useDebounce'
import { useMultistepForm } from '../../hooks/useMultistepForm'
import CustomerDetails from './CustomerDetails'
import DeviceInformation from './DeviceInformation'
import DeviceInspection from './DeviceInspection'
import CustomButton from '../../components/Button'
import { Colors } from '../../utils/colors'
import HeaderSteps from '../../components/HeaderSteps'
import BarcodeScanner from '../../components/BarcodeScanner'

export default function BookingForm() {
    const [searchCustomer, setSearchCustomer] = useState("")
    const debouncedCustomerSearch = useDebounce(searchCustomer, 400);

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [zip, setZip] = useState("");

    const [model, setModel] = useState("")
    const [imei, setImei] = useState("")
    const [make, setMake] = useState("Samsung")
    const [serialNumber, setSerialNumber] = useState("")
    const [isAssetDropdownFocus, setIsAssetDropdownFocus] = useState(false)
    const [assetType, setAssetType] = useState("");
    const [isBackUpNeedSwitchEnabled, setIsBackUpNeedSwitchEnabled] = useState(false)


    const [fault, setFault] = useState("")
    const [faultOccurence, setFaultOccurence] = useState("")
    const [faultOccurenceFocus, setFaultOccurenceFocus] = useState(false)


    const togglesetIsBackUpNeedSwitchEnabled = () => setIsBackUpNeedSwitchEnabled(previousState => !previousState);

    const submitData = async () => {
        const values = {
            firstname,
            lastname,
            email,
            address1,
            address2,
            city,
            province,
            zip,
            model,
            serialNumber,
            assetType,
            fault,
            faultOccurence
        }
        console.log(values)
    }

    const { searchedCustomerFirstname, searchedCustomerLastname, searchedCustomerEmail, searchedCustomerMobile, searchedCustomerAddress, searchedCustomerAddressTwo, searchedCustomerCity, searchedCustomerProvince, searchedCustomerZip } = getCustomerRepairshpr({ debouncedCustomerSearch })
    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
        useMultistepForm([
            <CustomerDetails
                firstname={firstname}
                setFirstname={e => setFirstname(e)}
                lastname={lastname}
                setLastname={e => setLastname(e)}
                email={email}
                setEmail={e => setEmail(e)}
                address1={address1}
                setAddress1={e => setAddress1(e)}
                address2={address2}
                setAddress2={e => setAddress2(e)}
                city={city}
                setCity={e => setCity(e)}
                province={province}
                setProvince={e => setProvince(e)}
                zip={zip}
                setZip={e => setZip(e)}

            />,

            <DeviceInformation
                model={model}
                setModel={e => setModel(e)}
                make={make}
                setMake={e => setMake(e)}
                serialNumber={serialNumber}
                setSerialNumber={e => setSerialNumber(e)}
                imei={imei}
                setImei={e => setImei(e)}
                assetType={assetType}
                setAssetType={e => setAssetType(e)}
                isAssetDropdownFocus={isAssetDropdownFocus}
                setIsAssetDropdownFocus={e => setIsAssetDropdownFocus(e)}
                isBackUpNeedSwitchEnabled={isBackUpNeedSwitchEnabled}
                setIsBackUpNeedSwitchEnabled={togglesetIsBackUpNeedSwitchEnabled}
            />,

            <DeviceInspection
                fault={fault}
                setFault={e => setFault(e)}
                faultOccurence={faultOccurence}
                setFaultOccurence={e => setFaultOccurence(e)}
                faultOccurenceFocus={faultOccurenceFocus}
                setFaultOccurenceFocus={e => setFaultOccurenceFocus(e)}
            />,
            <BarcodeScanner />
        ]);

    async function createTicket() { }
    async function createAssets() { }

    return (
        <>
            <StatusBar />
            <HeaderSteps
                currentStepIndex={currentStepIndex}
                steps={steps}
            />
            <Container>
                {step}
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 8
                }}>
                    {!isFirstStep && (
                        <CustomButton
                            text='Back'
                            fontSize={14}
                            onPress={back}
                            buttonBgColor={`${Colors.lightBlue}`}
                            pressedButtonBgColor={`${Colors.blue}`}
                        />
                    )}


                    {
                        isLastStep ? <CustomButton

                            text='Finish'
                            fontSize={14}
                            onPress={submitData}
                            buttonBgColor={`${Colors.lightBlue}`}
                            pressedButtonBgColor={`${Colors.blue}`}
                        /> :
                            <CustomButton

                                text='Next'
                                fontSize={14}
                                onPress={next}
                                buttonBgColor={`${Colors.lightBlue}`}
                                pressedButtonBgColor={`${Colors.blue}`}
                            />
                    }
                </View>




            </Container></>
    )
}