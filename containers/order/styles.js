import { StyleSheet, Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");
import Colors from "../../constants/colors";
import Constants from "expo-constants";
const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === "ios" ? null : Constants.statusBarHeight
  },
  center: {
    alignItems: "center"
  },
  orderText: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.primary
  },
  setting: {
    marginHorizontal: 20,
    fontSize: 22,
    padding: 10,
    fontWeight: "500"
  }
});

export default styles;
