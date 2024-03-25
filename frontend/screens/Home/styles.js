import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../utils/colors";

const windowHeight = Dimensions.get("window").width;
const windowWidth = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  homeHeadingOne: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Inter_200ExtraLight",
    color: Colors.black,
    marginBottom: 0,
    textTransform: "uppercase",
  },
  homeLogoWrapper: {
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 0,
  },
  homeLogo: {
    width: windowWidth / 2.5,
    height: windowHeight * 0.25,
    resizeMode: "contain",
    borderColor: "#ddd",
  },
  homeHeadingTwo: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Inter_300Light",
    color: Colors.black,
    margin: 0,
  },
  homeHeadingThree: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: Colors.black,
    margin: 0,
  },
});
