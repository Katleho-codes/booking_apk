import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  buttonStyles: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderWidth: 0,
    borderRadius: 4,
    elevation: 2,
    // width: "100%",
    backgroundColor: pressed ? pressedButtonBgColor : buttonBgColor,
  },
  buttonText: {
    color: "white",
    fontSize: fontSize,
    fontWeight: "600",
    textAlign: "center",
    textTransform: "capitalize",
    justifyContent: "space-around",
  },
});
