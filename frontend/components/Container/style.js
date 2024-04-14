import { StyleSheet } from "react-native";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
});
