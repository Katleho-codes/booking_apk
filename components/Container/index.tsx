import { View } from "react-native";


type IContainer = {
    children: React.ReactNode;
}
export default function Container({ children }: IContainer) {
    return (
        <View style={{
            flex: 1,
            padding: 10,
            backgroundColor: "#fff",
        }}>
            {children}
        </View>
    )
}

