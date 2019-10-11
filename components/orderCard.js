import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandler } from "expo";
import Swipeout from "react-native-swipeout";

const { width, height } = Dimensions.get("window");
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "accordion-collapse-react-native";
export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    var swipeoutBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        underlayColor: "rgba(0, 0, 0, 1, 0.6)",
        onPress: () => {
          this.props.onPress();
        }
      }
    ];
    const {
      img,
      orderDesc,
      brandName,
      date,
      branchName,
      orderQuantity,
      history,
      onPress
    } = this.props;
    return (
      <View
        style={{
          flex: 1,
          marginVertical: 4,
          backgroundColor: colors.white,
          marginHorizontal: 10,
          overflow: "hidden",
          borderRadius: 10,
          marginTop: 20,
          borderWidth: 0.3,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5
        }}
      >
        <Swipeout right={swipeoutBtns}>
          <View>
            <View>
              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                    backgroundColor: "white",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5
                  }}
                >
                  <Image
                    source={{ uri: img }}
                    style={{
                      height: 100,
                      width: 100,
                      marginVertical: 10,
                      marginHorizontal: 10
                    }}
                    resizeMode="stretch"
                  />
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 10,
                      marginVertical: 2
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",

                        marginVertical: 2
                      }}
                    >
                      <Text style={{ flex: 1, fontWeight: "bold" }}>
                        {brandName}
                      </Text>
                    </View>
                    {date == null ? null : (
                      <View style={{ flexDirection: "row" }}>
                        <Text>Date : </Text>
                        <Text
                          style={{ flex: 1, color: colors.Grey }}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {date}
                        </Text>
                      </View>
                    )}
                    {date == null ? (
                      <View></View>
                    ) : (
                      <View style={{ marginTop: 5 }}>
                        <View style={{ flex: 1 }}>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              justifyContent: "space-between"
                            }}
                          >
                            <Text>Location : </Text>
                            <Text
                              style={{ flex: 1, color: colors.Grey }}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {branchName}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between"
                            }}
                          >
                            <Text>Quantity:</Text>
                            <Text style={{ color: colors.Grey }}>
                              {orderQuantity}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                    <View
                      style={{
                        marginVertical: 5,
                        width: width * 0.5,
                        backgroundColor: colors.orange,
                        paddingVertical: 3,
                        borderRadius: 10,
                        alignSelf: "center"
                      }}
                    >
                      <Text
                        style={{
                          marginVertical: 5,
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: 13,
                          color: colors.white
                        }}
                      >
                        {orderDesc}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Swipeout>
      </View>
    );
  }
}
