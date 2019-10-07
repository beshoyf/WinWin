import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  Button
} from "react-native";
const { width, height } = Dimensions.get("window");
import colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import ProgresiveImage from "./ProgresiveImage.js";
import Menu, {
  MenuItem,
  MenuDivider,
  Position
} from "react-native-enhanced-popup-menu";

export default class ButtonComponent extends Component {
  render() {
    const {
      title,
      onPress,
      brandName,
      urlImageSmall,
      urlImageLarg,
      onPressOffer,
      isImage,
      pressHeart,
      isfav = false,
      isheart,
      onPressShare
    } = this.props;

    let textRef = React.createRef();
    let menuRef = null;

    const setMenuRef = ref => (menuRef = ref);
    const hideMenu = () => menuRef.hide();
    const onShareOffer = () => {
      menuRef.hide();
      setTimeout(() => {
        onPressShare();
      }, 500);
    };
    const onFavOffer = () => {
      menuRef.hide();
      // setTimeout(() => {
      pressHeart();
      // }, 400);
    };
    const onShowMoreOffer = () => {
      menuRef.hide();
      // setTimeout(() => {
      onPressOffer();
      // }, 200);
    };
    return (
      <View
        ref={textRef}
        style={{
          backgroundColor: colors.white,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          marginVertical: 10,
          borderRadius: 10
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            menuRef.show(textRef.current, (stickTo = Position.TOP_RIGHT))
          }
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 2,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2
          }}
        >
          <MaterialCommunityIcons
            name={"dots-vertical"}
            size={30}
            color="#FFF"
            style={{ paddingVertical: 10, paddingHorizontal: 5 }}
          />
        </TouchableOpacity>

        <Menu ref={setMenuRef}>
          <MenuItem onPress={onShareOffer}>Share offer</MenuItem>
          <MenuItem onPress={onFavOffer}>
            {isfav ? "Remove from favorite" : "Add to favorite"}
          </MenuItem>
          <MenuItem onPress={onShowMoreOffer}>Show more</MenuItem>
        </Menu>

        <TouchableOpacity
          style={{ flex: 1, overflow: "hidden", borderRadius: 10 }}
          onPress={onPressOffer}
        >
          {isImage ? null : (
            <ProgresiveImage
              thumbnailSource={{ uri: urlImageSmall }}
              source={{ uri: urlImageLarg }}
              style={{ height: 200, width: "100%" }}
            />
          )}

          <View style={{ backgroundColor: "#FFF", width: "100%" }}>
            <View style={{ flex: 1, flexDirection: "row", padding: 10 }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "600",
                    color: "#b6b8bf",
                    paddingBottom: 5,
                    textTransform: "uppercase"
                  }}
                >
                  {title}
                </Text>

                <TouchableOpacity
                  onPress={onPress}
                  style={{
                    flex: 0.3,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 13,
                      elevation: 5,
                      textAlign: "center"
                    }}
                  >
                    {brandName}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flex: 0.2,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={pressHeart}
                  style={{
                    // width: 40,
                    // height: 40,
                    // borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center"
                    // backgroundColor: isfav ? "#FFF" : "#FF4B6B",
                    // borderWidth: 1,
                    // borderColor: "#FF4B6B",
                  }}
                >
                  {isheart ? null : (
                    <MaterialCommunityIcons
                      onPress={pressHeart}
                      name={isfav ? "heart-circle" : "heart-circle-outline"}
                      size={30}
                      color={isfav ? "red" : colors.primary}
                      style={{}}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
