import { StyleSheet } from "react-native";
import { Colors } from "../../utils/colors";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

export const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  queryText: {
    color: Colors.black,
    fontSize: 18,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
    justifyContent: "space-around",
  },
});
