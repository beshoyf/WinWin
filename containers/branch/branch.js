import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Platform
} from "react-native";
import styles from "./styles";
import Back from "../../components/back";
import i18n from "../../utils/language";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SwipeRow, Icon, Button } from "native-base";
import Card from "../../components/card";
import Server from "../../constants/server";
const { api_url } = Server;
import Constants from "expo-constants";
import { connect } from "react-redux";
class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is: 0,
      isLoading: false,
      orderSatus: []
    };
  }
  componentWillMount() {
    const { navigation } = this.props;
    const itemId = navigation.getParam("branchId", "NO-ID");
    this.setState({ id: itemId });
  }
  componentDidMount() {
    this.renderNatification();
  }
  renderNatification = () => {
    this.setState({ isLoading: true });
    fetch(
      `${api_url}/Home/GetOffersForBranch?Length=100&BranchId=${this.state.id}`,
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
        console.log(responseJson);
        this.setState({
          orderSatus: responseJson,
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
        marginTop: 10,
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
        brandName={item.brandName}
        category={item.categoryName}
        urlImageSmall={item.brandIcon}
        urlImageLarg={item.image}
        title={item.title}
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
      />
    </View>
  );

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Back onPress={() => this.props.navigation.goBack()} title="Offers" />
        {this.state.isLoading == true ? (
          <ActivityIndicator
            style={{
              paddingTop:
                Platform.OS === "ios" ? null : Constants.statusBarHeight
            }}
          />
        ) : (
          <FlatList
            data={this.state.orderSatus}
            extraData={this.state}
            keyExtractor={item => item.offerId.toString()}
            renderItem={({ item }) => this.renderOrderSatatus(item)}
          />
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

export default connect(mapStateToProps)(HelloWorldApp);
