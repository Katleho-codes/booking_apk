import { View } from "react-native";
import { styles } from "./style";
import { IContainer } from "./interfaces";



export default function Container({ children }: IContainer) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

