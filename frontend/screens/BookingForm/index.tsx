import React, { useEffect, useState } from 'react'
import { StatusBar, View } from 'react-native'
import CustomButton from '../../components/Button'
import Container from '../../components/Container'
import HeaderSteps from '../../components/HeaderSteps'
import useDebounce from '../../hooks/useDebounce'
import { useMultistepForm } from '../../hooks/useMultistepForm'
import { Colors } from '../../utils/colors'
import Terms from '../Terms'
import CustomerDetails from './CustomerDetails'
import DeviceInspection from './DeviceInspection'
import axios from 'axios'
import { datetimestamp } from '../../utils/timezone'

export default function BookingForm() {
    const [searchCustomer, setSearchCustomer] = useState("")
    const debouncedCustomerSearch = useDebounce(searchCustomer, 400);

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
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
    const [isBackUpNeedCheckboxEnabled, setIsBackUpNeedCheckboxEnabled] = useState(false)


    const [fault, setFault] = useState("")
    const [faultOccurence, setFaultOccurence] = useState("")
    const [faultOccurenceFocus, setFaultOccurenceFocus] = useState(false)

    const checkIfCustomerWasHere = async () => {

        try {
            const { data } = await axios.get(`${process.env.EXPO_PUBLIC_REPAIRSHOPR_API_SUBDOMAIN}/customers?query=${email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.EXPO_PUBLIC_REPAIRSHOPR_BEARER_TOKEN}`
                },
            })
            if (data?.customers[0]?.email === email) {
                setFirstname(data?.customers[0]?.firstname)
                setLastname(data?.customers[0]?.lastname)
                setEmail(data?.customers[0]?.email)
                setPhoneNumber(data?.customers[0]?.mobile)
                setAddress1(data?.customers[0]?.address)
                setAddress2(data?.customers[0]?.address_2)
                setCity(data?.customers[0]?.city)
                setProvince(data?.customers[0]?.state)
                setZip(data?.customers[0]?.zip)

            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        checkIfCustomerWasHere()
    }, [email])

    const createTicket = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_REPAIRSHOPR_API_SUBDOMAIN}/tickets`, {
                method: "POST",

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.EXPO_PUBLIC_REPAIRSHOPR_BEARER_TOKEN}`
                },
                body: JSON.stringify({
                    "firstname": firstname,
                    "lastname": lastname,
                    "email": email,
                    "phone": phoneNumber,
                    "address": address1,
                    "address_2": address2,
                    "city": city,
                    "state": province,
                    "zip": zip,
                    "problem_type": assetType,
                    "status": "New",
                    "subject": fault,
                })
            })
            console.log("response", response)
        } catch (error) {
            console.log("ticket creation error", error)
        }
    }

    const createEntry = async () => {
        const values = {
            firstname,
            lastname,
            email,
            phoneNumber,
            assetType,
            fault,
            datetimestamp
        }
        // console.log(values)
        const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_LINK}/entry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(response => {
            response.json()
        }).catch((e) => console.log(e))

    }
    const submitData = async () => {
        // const values = {
        //     firstname,
        //     lastname,
        //     email,
        //     phoneNumber,
        //     address1,
        //     address2,
        //     city,
        //     province,
        //     zip,
        //     model,
        //     serialNumber,
        //     assetType,
        //     fault,
        //     faultOccurence
        // }
        // console.log(values)


        createEntry();
        createTicket();

    }


    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
        useMultistepForm([
            // <CustomerDetails
            //     firstname={firstname}
            //     setFirstname={e => setFirstname(e)}
            //     lastname={lastname}
            //     setLastname={e => setLastname(e)}
            //     email={email}
            //     setEmail={e => setEmail(e)}
            //     phoneNumber={phoneNumber}
            //     setPhoneNumber={e => setPhoneNumber(e)}
            //     address1={address1}
            //     setAddress1={e => setAddress1(e)}
            //     address2={address2}
            //     setAddress2={e => setAddress2(e)}
            //     city={city}
            //     setCity={e => setCity(e)}
            //     province={province}
            //     setProvince={e => setProvince(e)}
            //     zip={zip}
            //     setZip={e => setZip(e)}

            // />,

            // // <DeviceInformation
            // //     model={model}
            // //     setModel={e => setModel(e)}
            // //     make={make}
            // //     setMake={e => setMake(e)}
            // //     serialNumber={serialNumber}
            // //     setSerialNumber={e => setSerialNumber(e)}
            // //     imei={imei}
            // //     setImei={e => setImei(e)}
            // //     assetType={assetType}
            // //     setAssetType={e => setAssetType(e)}
            // //     isAssetDropdownFocus={isAssetDropdownFocus}
            // //     setIsAssetDropdownFocus={e => setIsAssetDropdownFocus(e)}
            // //     isBackUpNeedCheckboxEnabled={isBackUpNeedCheckboxEnabled}
            // //     setIsBackUpNeedCheckboxEnabled={setIsBackUpNeedCheckboxEnabled}
            // // />,

            // <DeviceInspection
            //     fault={fault}
            //     setFault={e => setFault(e)}
            //     faultOccurence={faultOccurence}
            //     setFaultOccurence={e => setFaultOccurence(e)}
            //     faultOccurenceFocus={faultOccurenceFocus}
            //     setFaultOccurenceFocus={e => setFaultOccurenceFocus(e)}
            //     assetType={assetType}
            //     setAssetType={e => setAssetType(e)}
            //     isAssetDropdownFocus={isAssetDropdownFocus}
            //     setIsAssetDropdownFocus={e => setIsAssetDropdownFocus(e)}
            // />,
            // <Terms />
        ]);


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