import { StyleSheet } from "react-native";
import { Colors } from "../../utils/colors";

export const styles = StyleSheet.create({
  searchCustomerContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    gap: 10,
  },
  searchCustomerInputLabel: {
    fontFamily: "Inter_600SemiBold",
    color: `${Colors.black}`,
    paddingVertical: 4,
    fontSize: 22,
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
