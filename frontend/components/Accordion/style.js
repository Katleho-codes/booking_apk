import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  details: {
    fontFamily: "Inter_400Regular",
    opacity: 0.65,
    borderWidth: 1,
  },
  title: {
    fontFamily: "Inter_400Regular",
    textTransform: "capitalize",
  },
  content: {
    marginTop: 8,
  },
  container: {
    width: "100%",
    // margin: 10,
    padding: 15,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
