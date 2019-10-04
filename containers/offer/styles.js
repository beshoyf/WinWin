import { StyleSheet, Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");
import colors from "../../constants/colors";
import Constants from "expo-constants";
const window = Dimensions.get("window");
const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;
const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: colors.skyBlue,
    paddingTop: Platform.OS === "ios" ? null : Constants.statusBarHeight
  },
  row: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 20
  },
  smallImg: {
    width: 50,
    height: 50
  },
  brandName: {
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase"
  },
  category: {
    color: colors.Grey,
    fontSize: 14
  },
  largImg: {
    height: 250,
    width: width * 0.9,
    alignSelf: "center"
  },
  brandText: {
    marginHorizontal: 20,
    fontSize: 30,
    marginTop: 20,
    fontWeight: "500"
  },
  description: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16
  },
  square: {
    backgroundColor: colors.orange,
    marginVertical: 10,
    width: width * 0.3,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  title: {
    textTransform: "capitalize",
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white
  },
  column: {
    flexDirection: "column",
    marginLeft: 10,
    justifyContent: "space-between"
  },
  counter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 5,
    marginVertical: 20,
    borderRadius: 10
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
    marginHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#0973d9"
  },
  textButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    backgroundColor: colors.primary,
    height: STICKY_HEADER_HEIGHT,
    width,
    justifyContent: "flex-end"
  },
  stickySectionText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: "absolute",
    bottom: 10,
    left: 10
  },
  fixedSectionText: {
    color: "#999",
    fontSize: 20
  },
  parallaxHeader: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  },
  sectionTitleText: {
    color: "white",
    fontSize: 18,
    paddingVertical: 5
  },
  row: {
    overflow: "hidden",
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: "white",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    justifyContent: "center"
  },
  rowText: {
    fontSize: 20
  }
});

export default styles;
