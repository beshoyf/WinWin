import React, { Component } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Button,
  TouchableOpacity,
  Animated,
  Easing
} from "react-native";
import { connect } from "react-redux";
const { width, height } = Dimensions.get("window");
import { LoginStack, MenuStack } from "../navigation/RootNavigation";
import Rates from "../containers/Rates/rates";
import { Linking } from "expo";
import { NavigationActions } from "react-navigation";
let _navigator;
import CountDown from "react-native-countdown-component";

const isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

class Loading extends Component {
  state = {
    submited: true,
    fadeAnim: new Animated.Value(1),
    fadeAnim2: new Animated.Value(1),
    borderRadiusAnim: new Animated.Value(0)
  };
  animate = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 850,
      easing: Easing.back(),
      useNativeDriver: true
    }).start(() => this.setState({ submited: true }));
  };
  animate2 = () => {
    Animated.timing(this.state.fadeAnim2, {
      toValue: 0,
      duration: 650,
      easing: Easing.back(),
      useNativeDriver: true
    }).start();
  };
  animateBorderRadius = () => {
    Animated.timing(this.state.borderRadiusAnim, {
      toValue: width / 2,
      duration: 800,
      easing: Easing.back(),
      useNativeDriver: true
    }).start(() => this.setState({ submited: true }));
  };
  // componentDidMount() {
  //     const path = !isEmpty(this.props.user) ? 'MainMenu' : 'Login'
  //     this.props.navigation.navigate(path)

  // }

  setTopLevelNavigator = navigatorRef => {
    _navigator = navigatorRef;
  };
  navigate = (routeName, params) => {
    this.navigator.dispatch(
      NavigationActions.navigate({
        routeName: routeName,
        params
      })
    );
  };

  componentDidMount() {
    // Linking.addEventListener("url", this._handleUrl);
    // Linking.getInitialURL()
    //         .then(url => {
    //             // console.log("Getting initial URL", url);
    //           var url =  url.split('/');
    //           console.log(JSON.stringify(url))
    //           var length = url.length;
    //           var id = url[length-1];
    //           var screen_name = url[length-2]
    //           if(!isEmpty(this.props.user)){
    //             this.navigate('offer',{offerId:id})
    //           }
    //             var prefix = url;
    //           // console.log('id = '+id+'name = '+screen_name)
    //         })
  }

  render() {
    const prefix = Linking.makeUrl("/");
    console.log("deaplink : " + prefix);

    const { fadeAnim, fadeAnim2, borderRadiusAnim } = this.state;
    return (
      <>
        {!isEmpty(this.props.user) ? (
          <View style={{ flex: 1 }}>
            <CountDown
              until={60}
              onFinish={() => this.setState({ submited: false })}
              onPress={() => alert("hello")}
              size={20}
              style={{ position: "absolute" }}
            />
            {this.state.submited ? null : (
              <>
                <Animated.View
                  style={{
                    position: "absolute",
                    zIndex: 10,
                    opacity: fadeAnim2,
                    width,
                    height,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(255,255,255,.95)"
                  }}
                ></Animated.View>
                <Animated.View
                  style={{
                    position: "absolute",
                    zIndex: 10,
                    opacity: fadeAnim,
                    borderRadius: borderRadiusAnim,
                    width,
                    height: width,
                    top: width / 2,
                    transform: [{ scaleX: fadeAnim }, { scaleY: fadeAnim }],
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(255,255,255,.9)"
                  }}
                >
                  <Rates
                    submit={() => {
                      this.animate();
                      this.animate2();
                      this.animateBorderRadius();
                    }}
                  />
                </Animated.View>
              </>
            )}
            <MenuStack uriPrefix={prefix} />
          </View>
        ) : (
          <LoginStack uriPrefix={prefix} />
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Loading);
