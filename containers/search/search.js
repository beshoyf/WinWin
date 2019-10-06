import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  TextInput,
  SafeAreaView,
  Share
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
import axios from "axios";
class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      isLoading: false,
      orderSatus: []
    };
  }
  componentWillMount() {
    // const { navigation } = this.props;
    // const itemId = navigation.getParam("searchText", "NO-ID");
    // this.setState({ id: itemId });
    this._inpute && this._inpute.focus();
  }
  onShare =  (message) => {

     Share.share({
        message,
        url:message
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

  componentDidMount() {
    this._inpute && this._inpute.focus();
  }
  search = () => {
    this.setState({ isLoading: true });

    axios({
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      url: `${api_url}/Home?length=100&OfferId=0&search=${this.state.id}`
    })
      .then(res => {
        // console.log(res);
        this.setState({
          ...this.state,
          orderSatus: res.data,
          isLoading: false,
          secondLoding: false
        });
      })
      .catch(error => {
        this.setState({
          ...this.state,
          fetching: false
        });
        alert("try again");
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
      onPressShare = {()=>this.onShare('winwin://offer/'+item.offerId+'/'+item.categoryName+'/'+item.brandName)}
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={styles.input}
              ref={ref => {
                this._inpute = ref;
              }}
              autoFocus={this.state.focus}
              onChangeText={text => this.setState({ id: text })}
              onSubmitEditing={() => this.search()}
              placeholder="Search"
            />

            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
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
            ListEmptyComponent={
              <View style={{justifyContent:'center',alignItems:'center'}}>
              <Text style={{textAlign:'center',marginTop:'50%',fontSize:20}}>{i18n.t('search')}</Text>
              </View>
            }
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
