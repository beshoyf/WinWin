import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
  Share
} from "react-native";
const { width, height } = Dimensions.get("window");
import styles from "./styles";
import Card from "../../components/card";
import Server from "../../constants/server";
//import Constants from 'expo-constants';
import colors from "../../constants/colors";

import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
const { api_url } = Server;
import { connect } from "react-redux";
class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      isLoading: false,
      orderSatus: []
    };
  }
  renderOrderSatatus = item => {
    console.log(item);
    return (
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
                item.catName +
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
          urlImageSmall={item.subNails}
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
  };

  onShare = message => {
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
        if (responseJson.status == 200) {
          var orderSatus = this.state.orderSatus;
          orderSatus.map(post => {
            if (post.offerId == id) {
              post.isFavorite = !post.isFavorite;
            }
          });
          this.setState({ orderSatus });
        }
      })
      .catch(error => {
        alert(error);
      });
  };
  componentWillMount() {
    this.didFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.setState({ isLoading: true }, this.renderHistory());
      }
    );

    this.setState({ id: this.props.user.userId });
  }
  componentWillUnmount() {
    // Remove the listener when you are done
    this.didFocusSubscription.remove();
  }
  componentDidMount() {
    this.renderHistory();
  }
  onRefresh() {
    this.setState({ isLoading: true }, this.renderHistory());
  }
  renderHistory = () => {
    this.setState({ isLoading: true });
    fetch(`${api_url}/UserFavourites?userid=${this.props.user.userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson);
        this.setState({
          orderSatus: responseJson,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.setting, { color: colors.primary, padding: 5 }]}>
          Favorite
        </Text>
        {this.state.isLoading == true ? (
          <View>
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
            <ShimmerPlaceHolder
              style={{ marginHorizontal: 13, borderRadius: 15, marginTop: 10 }}
              autoRun={true}
              height={height * 0.28}
              width={width * 0.94}
              visible={false}
            ></ShimmerPlaceHolder>
          </View>
        ) : (
          <FlatList
            data={this.state.orderSatus}
            extraData={this.state}
            keyExtractor={item => item.offerId.toString()}
            renderItem={({ item }) => this.renderOrderSatatus(item)}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isLoading}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: height * 0.4
                }}
              >
                <Text style={{ fontSize: 16 }}>No Offer</Text>
              </View>
            }
          />
        )}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(HelloWorldApp);
