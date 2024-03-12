import { useEffect, useState } from "react"


export const useTermsAndConditions = () => {
    const [termsAndConditions, setTermsAndConditions] = useState<string[] | any[]>([])


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `${process.env.EXPO_PUBLIC_BACKEND_LINK}/terms_and_conditions`,
                {
                    method: "GET",
                    mode: "no-cors",
                    cache: "default"
                }
            )
            const data = await response.json()

            setTermsAndConditions(data)
        }
        fetchData();
    }, [termsAndConditions])
    return { termsAndConditions }
}