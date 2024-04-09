import { StyleSheet, useWindowDimensions } from "react-native";
import { Colors } from "../../utils/colors";

export const styles = StyleSheet.create({
  textInputWithButtonFlexed: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 2,
    marginVertical: 4,
    paddingHorizontal: 10,
  },
  textInputWithButtonFlexedInput: {
    fontFamily: "Inter_500Medium",
    paddingVertical: 12,
    width: "90%",
  },
  textInputParent: { marginVertical: 4 },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderColor: "#eee",
    borderRadius: 2,
    fontFamily: "Inter_500Medium",
    width: "100%",
  },
  dropdownInput: {
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  dropdownInputText: {
    fontFamily: "Inter_500Medium",
    color: `${Colors.grey}`,
    fontSize: 14,
  },
  dropdownInputPlaceholder: {
    fontFamily: "Inter_500Medium",
    color: `${Colors.grey}`,
    fontSize: 14,
  },
  checkboxWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  checkboxLabel: {
    paddingVertical: 10,
    fontFamily: "Inter_400Regular",
    color: `${Colors.black}`,
  },
  modalOpenStyles: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000040",
    padding: 10,
  },
  modalSignaturePadWrapper: {
    height: 400,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
});
