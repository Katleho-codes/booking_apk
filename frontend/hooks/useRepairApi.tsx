import { useEffect, useState } from "react"


type TuseGetCustomerRepairshpr = {
    debouncedCustomerSearch: string;
}
export const getCustomerRepairshpr = ({ debouncedCustomerSearch }: TuseGetCustomerRepairshpr) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [zip, setZip] = useState("");

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
                    setFirstname(data?.customers[0]?.firstname)
                    setLastname(data?.customers[0]?.lastname)
                    setEmail(data?.customers[0]?.email)
                    setPhoneNumber(data?.customers[0]?.mobile)
                    setAddress1(data?.customers[0]?.address)
                    setAddress2(data?.customers[0]?.address_2)
                    setCity(data?.customers[0]?.city)
                    setProvince(data?.customers[0]?.state)
                    setZip(data?.customers[0]?.zip)
                })
                .catch((e) => console.log("ticket info error", e));
        };
        fetchData();
    }, [debouncedCustomerSearch]);

    return { firstname, lastname, email, phoneNumber, address1, address2, city, province, zip }
}