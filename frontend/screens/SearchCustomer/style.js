import { StyleSheet } from "react-native";
import { Colors } from "../../utils/colors";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

export const styles = StyleSheet.create({
  searchCustomerContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    gap: 10,
  },
  searchCustomerInputLabel: {
    fontFamily: "Inter_600SemiBold",
    color: `${Colors.black}`,
    paddingVertical: 4,
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  searchCustomerInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderColor: "#eee",
    borderRadius: 2,
    fontFamily: "Inter_500Medium",
    width: "100%",
  },
  searchCustomerResultText: {
    fontFamily: "Inter_500Medium",
    color: `${Colors.blue}`,
    paddingVertical: 4,
    textAlign: "center",
  },
});
