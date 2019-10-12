import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  ImageBackground,
  Button,
  Slider,
  Animated,
  Share,
  AsyncStorage
} from "react-native";
import styles from "./styles";
import Rates from "../Rates/rates";
import Card from "../../components/card";

import colors from "../../constants/colors";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import i18n from "../../utils/language";
import Server from "../../constants/server";
const { api_url } = Server;

import axios from "axios";
import Constants from "expo-constants";
const { width, height } = Dimensions.get("window");
import { connect } from "react-redux";
class HelloWorldApp extends Component {
  componentWillMount() {
    const { navigation } = this.props;
    const whereToGo = navigation.getParam("whereToGo", "NO-ID");
    this.props.navigation.navigate(whereToGo);
  }

  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      isLoading: true,
      secondLoding: false,
      language: "",
      initialOffer: 0,
      activeOffer: 0,
      orderSatus: [],
      refresh: false,
      issearch: false,
      isActive: false,
      paddingVerticalAnim: new Animated.Value(40),
      i: require("../../assets/win.png"),
      categories: [
        {
          id: 1015,
          title: "foods",
          iconName: "ios-cafe",
          img: require("../../assets/foods.png")
        },
        {
          id: 1016,
          title: "Fashion",
          iconName: "ios-shirt",
          img: require("../../assets/fashion.png")
        },
        {
          id: 1017,
          title: "Travelling",
          iconName: "ios-planet",
          img: require("../../assets/travel.png")
        },
        {
          id: 1018,
          title: "Entertainment",
          iconName: "ios-headset",
          img: require("../../assets/inter.jpeg")
        },
        {
          id: 1019,
          title: "BeautyHealth",
          iconName: "ios-fitness",
          img: require("../../assets/gym.png")
        },
        {
          id: 1021,
          title: "Special",
          iconName: "ios-ribbon",
          img: require("../../assets/special.jpeg")
        },
        {
          id: 1022,
          title: "Medical",
          iconName: "ios-medkit",
          img: require("../../assets/medical.png")
        }
      ],
      isModalVisible: false
    };
  }
  componentDidMount() {
    // Animated.timing(
    //   this.state.paddingVerticalAnim,
    //   {
    //     toValue: 10,
    //     duration: 3000,
    //     useNativeDriver: false
    //   },
    // ).start();
    // if(this.props.navigation.state.params !== undefined){
    // this.props.navigation.navigate("Order");
    // }
    console.log(this.props.user.language);
    i18n.locale = this.props.user.language;

    this.fetchOffers();
    //this.isActive();
    AsyncStorage.getItem("data").then(data => {
      if (data == undefined) {
        // alert('yes')
      } else {
        this.setState({
          orderSatus: JSON.parse(data),
          isLoading: false
        });
      }
    });
  }
  // isActive = () => {
  //   fetch(`${api_url}/Users/IsActive?userid=${this.props.user.userid}`, {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       console.log(responseJson);
  //       this.setState({ isActive: responseJson });
  //       console.log("is active" + isActive);
  //       this.props.activateMethod({
  //         ...this.props.user,
  //         isActive: this.state.isActive
  //       });
  //     })
  //     .catch(error => {});
  // };
  // fetchOffers = () => {
  //   this.setState({ isLoading: true });
  //   fetch(
  //     `${api_url}/Home/GetAllOffers_Favorite?length=${3}&OfferId=${
  //       this.state.initialOffer
  //     }&userId=${this.props.user.userId}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       }
  //     }
  //   )
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       //  console.log(responseJson);
  //       this.setState({
  //         orderSatus: responseJson,
  //         isLoading: false
  //       });
  //     })
  //     .catch(error => {
  //       this.setState({
  //         isLoading: false
  //       });
  //     });
  // };
  fetchOffers = () => {
    this.setState({ isLoading: true });
    fetch(
      `${api_url}/Home/GetAllOffers_Favorite?length=${50}&OfferId=${
        this.state.initialOffer
      }&userId=${this.props.user.userId}`,
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
        AsyncStorage.setItem("data", JSON.stringify(responseJson));
        //  console.log(responseJson);
        this.setState({
          orderSatus: responseJson,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
      });
  };
  onShare =message => {
    if(Platform.OS == 'android'){
      Share.share({
        message:encodeURI(message),
        url: message
      });
    }
    else {

    Share.share({
    url: message
    });

  };
}
  toggleFavorite = item => {
    var id = item.offerId;
    fetch(
      `${api_url}/UserFavourites/${
        item.isFavorite ? "RemoveFavourite" : "Add"
      }?userid=${this.props.user.userId}&offerid=${id}`,
      {
        method: `${item.isFavorite ? "DELETE" : "POST"}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(responseJson => {
        var orderSatus = this.state.orderSatus;
        orderSatus.map(post => {
          if (post.offerId == id) {
            post.isFavorite = !post.isFavorite;
          }
        });
        this.setState({ orderSatus });
        if (responseJson.status == 200) {
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  renderOrderSatatus = item => (
    <View
      style={{
        marginHorizontal: 10,
        flex: 1
      }}
    >
      <Card
        onPressShare={() =>
          this.onShare(
            "winwin://offer/" +
              item.offerId +
              "/" +
              item.categoryName +
              "/" +
              item.brandName
          )
        }
        pressHeart={() => this.toggleFavorite(item)}
        brandName={
          this.props.user.language == "en"
            ? item.brandName
            : item.brandAName == null
            ? item.brandName
            : item.brandAName
        }
        category={item.categoryName}
        urlImageSmall={item.brandIcon}
        urlImageLarg={item.image}
        title={
          this.props.user.language == "en"
            ? item.title
            : item.aTitle == null
            ? item.title
            : item.aTitle
        }
        onPress={() =>
          this.props.navigation.navigate("Brand", { brandId: item.brandId })
        }
        onPressOffer={() =>
          this.props.navigation.navigate("Offer", {
            offerId: item.offerId,
            categoryName: item.categoryName,
            brandName: item.brandName
          })
        }
        isfav={item.isFavorite}
      />
    </View>
  );

  category = item => (
    <TouchableOpacity
      style={{}}
      onPress={() =>
        this.props.navigation.navigate("Categories", {
          catId: item.id,
          title: item.title
        })
      }
    >
      <ImageBackground
        source={item.img}
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: 5,
          paddingHorizontal: 20,
          paddingVertical: 40,
          overflow: "hidden",
          borderRadius: 10
        }}
      >
        <View style={styles.overlay} />
        <View style={styles.categoryIcon}>
          <Animated.Text style={{ ...styles.categoryTxt }}>
            {i18n.t(item.title)}
          </Animated.Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  // newOffer = () => {
  //   this.setState({ secondLoding: true });
  //   // this.setState({
  //   //   initialOffer: this.state.orderSatus[this.state.orderSatus.length - 1]
  //   //     .offerId
  //   // });
  //   alert(this.state.orderSatus[this.state.orderSatus.length - 1].offerId);
  //   axios({
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     url: `${api_url}/Home?length=${2}&OfferId=${this.state.initialOffer}`
  //   })
  //     .then(res => {
  //       console.log(res);
  //       this.setState({
  //         ...this.state,
  //         orderSatus: [...this.state.orderSatus, ...res.data],
  //         isLoading: false,
  //         secondLoding: false
  //       });
  //     })
  //     .catch(error => {
  //       this.setState({
  //         ...this.state,
  //         isLoading: false
  //       });
  //       alert("try again");
  //     });
  // };
  search = () => {
    const searchText = this.state.searchText;
    this._inpute && this._inpute.focus();
    this.props.navigation.navigate("Search", { searchText: searchText });
  };
  onRefresh() {
    this.setState({ isLoading: true }, this.fetchOffers());
  }
  handleScroll = e => {
    console.log(e.nativeEvent.contentOffset.y);
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.textHeader}>Winwin</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather
              onPress={this.search}
              name="search"
              size={Platform.OS === "ios" ? 25 : 25}
              color={colors.black}
              style={styles.iconStyle}
            />
            <MaterialIcons
              onPress={() => this.props.navigation.navigate("Notifications")}
              name="notifications"
              size={Platform.OS === "ios" ? 25 : 25}
              color={colors.black}
              style={[
                styles.iconStyle,
                { marginHorizontal: 0, marginRight: 12 }
              ]}
            />
          </View>
        </View>
        <View style={{}}>
          <Text style={styles.text}>Category</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={this.state.categories}
            extraData={i18n.locale}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => this.category(item)}
            ListHeaderComponent={<View style={{ marginLeft: 8 }} />}
          />
        </View>
        {this.state.isLoading == true ? (
          <View>
            <ShimmerPlaceHolder
              autoRun={true}
              visible={false}
              style={{ marginHorizontal: 15, marginVertical: 10 }}
            />
            <ShimmerPlaceHolder
              style={{ marginHorizontal: 13, borderRadius: 15 }}
              autoRun={true}
              height={height * 0.28}
              width={width * 0.94}
              visible={false}
            ></ShimmerPlaceHolder>
            <ShimmerPlaceHolder
              style={{ marginHorizontal: 13, borderRadius: 15, marginTop: 10 }}
              autoRun={true}
              height={height * 0.28}
              width={width * 0.94}
              visible={false}
            ></ShimmerPlaceHolder>
          </View>
        ) : (
          <View>
            <Text style={styles.text}>Offers</Text>
            <FlatList
              data={this.state.orderSatus}
              extraData={this.state}
              keyExtractor={(item, i) => i.toString()}
              renderItem={({ item }) => this.renderOrderSatatus(item)}
              ListFooterComponent={() => <View style={{ height: 240 }} />}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isLoading}
              // onScroll={this.handleScroll}

              //onEndReached={() => this.newOffer()}
              ListEmptyComponent={
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../../assets/404.png")}
                    style={{ width: width * 0.5, height: height * 0.5 }}
                  />
                  {/* <Text>NO OFFER AT IT</Text> */}
                </View>
              }
            />
          </View>
        )}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    activateMethod: user => {
      dispatch({ type: EDIT_USER, value: user });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelloWorldApp);
