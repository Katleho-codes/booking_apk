import { StyleSheet } from "react-native";
import { Colors } from "../../utils/colors";

export const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: `${Colors.white}`,
    borderWidth: 1,
    borderColor: `${Colors.lightGrey}`,
    borderRadius: 2,
  },
  headerText: {
    textAlign: "center",
    color: `${Colors.blue}`,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter_500Medium",
    width: "100%",
  },
});
