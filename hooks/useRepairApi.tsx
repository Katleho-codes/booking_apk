import { useEffect, useState } from "react"


type TuseGetCustomerRepairshpr = {
    debouncedCustomerSearch: string;
}
export const getCustomerRepairshpr = ({ debouncedCustomerSearch }: TuseGetCustomerRepairshpr) => {
    const [searchedCustomerFirstname, setSearchedCustomerFirstname] = useState<string>("")
    const [searchedCustomerLastname, setSearchedCustomerLastname] = useState("")
    const [searchedCustomerEmail, setSearchedCustomerEmail] = useState("")
    const [searchedCustomerMobile, setSearchedCustomerMobile] = useState("")
    const [searchedCustomerAddress, setSearchedCustomerAddress] = useState("")
    const [searchedCustomerAddressTwo, setSearchedCustomerAddressTwo] = useState("")
    const [searchedCustomerCity, setSearchedCustomerCity] = useState("")
    const [searchedCustomerProvince, setSearchedCustomerProvince] = useState("")
    const [searchedCustomerZip, setSearchedCustomerZip] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            await fetch(
                `${process.env.EXPO_PUBLIC_REPAIRSHOPR_API_SUBDOMAIN}/customers?email=${debouncedCustomerSearch}`,

                {
                    method: "GET",
                    mode: "no-cors",
                    cache: "default",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.EXPO_PUBLIC_REPAIRSHOPR_BEARER_TOKEN}`,
                    },
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    setSearchedCustomerFirstname(data?.customers[0]?.firstname)
                    setSearchedCustomerLastname(data?.customers[0]?.lastname)
                    setSearchedCustomerEmail(data?.customers[0]?.email)
                    setSearchedCustomerMobile(data?.customers[0]?.mobile)
                    setSearchedCustomerAddress(data?.customers[0]?.address)
                    setSearchedCustomerAddressTwo(data?.customers[0]?.address_2)
                    setSearchedCustomerCity(data?.customers[0]?.city)
                    setSearchedCustomerProvince(data?.customers[0]?.state)
                    setSearchedCustomerZip(data?.customers[0]?.zip)
                })
                .catch((e) => console.log("ticket info error", e));
        };
        fetchData();
    }, [debouncedCustomerSearch]);

    return { searchedCustomerFirstname, searchedCustomerLastname, searchedCustomerEmail, searchedCustomerMobile, searchedCustomerAddress, searchedCustomerAddressTwo, searchedCustomerCity, searchedCustomerProvince, searchedCustomerZip }
}