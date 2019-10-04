import React, { Component } from "react";
import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  Text,
  View
} from "react-native";
const { width, height } = Dimensions.get("window");

import colors from "../../constants/colors";
import styles from "./styles";
import Back from "../../components/back";
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import i18n from "../../utils/language";
import Server from "../../constants/server";
import Constants from "expo-constants";
const { api_url } = Server;
import { connect } from "react-redux";
import axios from "axios";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import AwesomeButton from "react-native-really-awesome-button";

class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      offer: [],
      count: 0,
      brandName: "",
      categoryName: "",
      isLoading: false,
      btnLoad: false,
      year: "",
      month: "",
      day: "",
      scroll: false,
      isFavorite: false
    };
  }
  componentWillMount() {
    const { navigation } = this.props;
    const offerId = navigation.getParam("offerId", "NO-ID");
    const categoryName = navigation.getParam("categoryName", "NO-ID");
    const brandName = navigation.getParam("brandName", "NO-ID");
    this.setState({
      id: offerId,
      brandName: brandName,
      categoryName: categoryName
    });
  }
  componentDidMount() {
    this.renderOffer();
    var year = new Date().toLocaleDateString(); //Current Year
    this.setState({
      year: year
    });
  }
  renderOffer = () => {
    this.setState({ isLoading: true });
    fetch(
      `${api_url}/Offers/GetOffer?offerId=${this.state.id}&userId=${this.props.user.userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        //  console.log("a;slfj;alsfj;alsjf;lasjf", responseJson);
        this.setState({
          isFavorite: responseJson.isFavorite,
          offer: responseJson,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
        alert("try again");
      });
  };
  increase = () => {
    if (this.state.count < this.state.offer.useLimit)
      this.setState({ count: this.state.count + 1 });
    else alert("it's maximum");
  };
  decrease = () => {
    if (this.state.count != 0) this.setState({ count: this.state.count - 1 });
    else alert("No offer");
  };
  offer = () => {
    if (this.props.user.isActive == true) {
      if (this.state.count != 0) {
        this.setState({
          btnLoad: true
        });

        axios({
          method: "POST",
          baseURL: api_url,
          url: `/Orders/MakeOrder?userId=${this.props.user.userId}&orderDate=${this.state.year}&Qty=${this.state.count}&OfferId=${this.state.id}&Price=0`,
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            // console.log(res);
            this.setState({
              btnLoad: false
            });
            this.props.navigation.navigate("Order");
          })
          .catch(err => {
            this.setState({
              btnLoad: false
            });
            if (err.response.status === 400) {
              alert(err.response.data.detail);
            } else {
              alert("try again");
            }
          });
      } else {
        alert("counter is zero");
      }
    } else this.props.navigation.navigate("QrCode");
  };

  toggleFavorite = () => {
    fetch(
      `${api_url}/UserFavourites/${
        this.state.isFavorite ? "RemoveFavourite" : "Add"
      }?userid=${this.props.user.userId}&offerid=${this.state.id}`,
      {
        method: `${this.state.isFavorite ? "DELETE" : "POST"}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(responseJson => {
        if (responseJson.status == 200) {
          this.setState({ isFavorite: !this.state.isFavorite });
        }
      })
      .catch(error => {
        alert(error);
      });
  };
  openDirection = () => {
    var url = `${
      Platform.OS === "ios"
        ? `https://maps.apple.com/`
        : "https://maps.google.com/"
    }?daddr=${this.state.offer.latitude},${this.state.offer.longitude}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error("An error occurred", err));
  };
  back = () => {};
  render() {
    const { onScroll = () => {} } = this.props;
    return (
      <ParallaxScrollView
        onScroll={onScroll}
        headerBackgroundColor="#fff"
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        backgroundSpeed={10}
        renderContentBackground={() => (
          <View style={{}}>
            <View style={{ marginHorizontal: 20 }}>
              <View
                style={{
                  marginVertical: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  flexDirection: "row",
                  flex: 1
                }}
              >
                <View
                  style={{
                    flex: 1.7,
                    backgroundColor: colors.orange,
                    padding: 10,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text style={styles.title}>
                    {this.props.user.language == "en"
                      ? this.state.offer.title
                      : this.state.offer.atitle == null
                      ? this.state.offer.title
                      : this.state.offer.atitle}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <SimpleLineIcons
                    onPress={this.openDirection}
                    name="location-pin"
                    size={Platform.OS === "ios" ? 23 : 23}
                    color={colors.primary}
                    style={{
                      paddingHorizontal: 10,
                      paddingLeft: 20,
                      paddingVertical: 10
                    }}
                  />
                  <Ionicons
                    onPress={this.toggleFavorite}
                    name={
                      this.state.isFavorite ? "ios-heart" : "ios-heart-empty"
                    }
                    size={25}
                    color={this.state.isFavorite ? "red" : colors.primary}
                    style={{
                      flex: 1,
                      paddingHorizontal: 10,
                      paddingVertical: 10
                    }}
                  />
                </View>
              </View>
              <Text style={styles.description}>
                {this.props.user.language == "en"
                  ? this.state.offer.description
                  : this.state.offer.adescription == null
                  ? this.state.offer.description
                  : this.state.offer.adescription}
              </Text>

              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row"
                }}
              >
                <View style={styles.counter}>
                  <AntDesign
                    onPress={() => this.increase()}
                    name="plus"
                    size={22}
                    style={{ padding: 5 }}
                    color={colors.primary}
                  />
                  <View style={{ flexDirection: "row", marginHorizontal: 15 }}>
                    <Text>{this.state.count}</Text>
                    <Text>/</Text>
                    <Text>{this.state.offer.useLimit}</Text>
                  </View>
                  <AntDesign
                    onPress={() => this.decrease()}
                    name="minus"
                    size={22}
                    color={colors.primary}
                    style={{ padding: 5 }}
                  />
                </View>
              </View>
            </View>
            <AwesomeButton
              progress
              width={width - 40}
              backgroundColor={colors.primary}
              backgroundDarker="#065d96"
              borderRadius={10}
              style={{ alignSelf: "center" }}
              onPress={next => {
                /** Do Something **/
                next();
              }}
            >
              confirm
            </AwesomeButton>
            {/* <TouchableOpacity onPress={this.offer} style={styles.button}>
              {this.state.btnLoad ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.textButton}>{i18n.t("confirm")}</Text>
              )}
            </TouchableOpacity> */}
          </View>
        )}
        renderBackground={() => (
          <View style={{}} key="background">
            <Image
              blurRadius={2}
              source={{
                uri: this.state.offer.image,
                width: window.width,
                height: PARALLAX_HEADER_HEIGHT
              }}
            />
            <View
              style={{
                position: "absolute",
                top: 0,
                width: window.width,
                backgroundColor: "rgba(0,0,0,.4)",
                height: PARALLAX_HEADER_HEIGHT
              }}
            />
          </View>
        )}
        renderForeground={() => (
          <View key="parallax-header" style={styles.parallaxHeader}>
            <Text style={styles.sectionSpeakerText}>
              {this.props.user.language == "en"
                ? this.state.offer.brandName
                : this.state.offer.brandAName == null
                ? this.state.offer.brandName
                : this.state.offer.brandAName}
            </Text>
          </View>
        )}
        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.stickySection}>
            <Text style={styles.stickySectionText}>
              {this.props.user.language == "en"
                ? this.state.offer.brandName
                : this.state.offer.brandAName == null
                ? this.state.offer.brandName
                : this.state.offer.brandAName}
            </Text>
          </View>
        )}
        renderFixedHeader={() => (
          <View key="fixed-header" style={styles.fixedSection}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                onPress={() => this.props.navigation.goBack()}
                name="ios-arrow-back"
                size={24}
                color={colors.white}
                style={{
                  top: 2,
                  paddingHorizontal: 10
                }}
              />
              <Text
                style={[styles.fixedSectionText, { color: "white" }]}
                onPress={() => this.props.navigation.goBack()}
              >
                back
              </Text>
            </View>
          </View>
        )}
      />
    );
  }
}

const window = Dimensions.get("window");
const STICKY_HEADER_HEIGHT = 70;
const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(HelloWorldApp);
