import { StyleSheet } from "react-native";
import { Colors } from "../../utils/colors";

export const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    padding: 10,
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
