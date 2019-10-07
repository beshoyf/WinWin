import React, { Component } from "react";
import { Clipboard } from "react-native";
import { EDIT_USER } from "../../store/CONSTANTS";
const { width, height } = Dimensions.get("window");
import axios from "axios";
import {
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  SafeAreaView
} from "react-native";
import styles from "./styles";
import colors from "../../constants/colors";
import Server from "../../constants/server";
import i18n from "../../utils/language";
import { connect } from "react-redux";
import { logIn } from "../../store/actions/user";
import * as Facebook from "expo-facebook";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";

const { api_url } = Server;
class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "en",
      name: "",
      pass: "",
      isShowingText: false,
      nameWrong: "",
      nameBool: false,
      passWrong: "",
      passBool: false,
      fetching: false
    };
  }
  componentWillMount() {
    i18n.locale = this.state.language;
  }
  loginFacebook = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync("1120854974780852", {
        permissions: ["public_profile"]
      });
      if (type === "success") {
        Clipboard.setString(token);
        axios({
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          url: `${api_url}/Users/FacebookRegister?token=${token}`
        })
          .then(responseJson => {
            // console.log(responseJson.data);
            this.props.loginMethod({
              ...responseJson.data,
              language: this.state.language
            });
            this.setState({ ...this.state, fetching: false });
            this.props.navigation.navigate("MainMenu");
          })
          .catch(error => {
            this.props.loginMethod({});
            this.setState({ ...this.state, fetching: false });
            // console.log(error)
            alert("invalid credentials");
          });
        // Get the user's name using Facebook's Graph API
        // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  login = () => {
    if (this.state.name.length < 1 || this.state.pass.length < 1) {
      if (this.state.name.length < 7)
        this.setState({ nameBool: true, nameWrong: i18n.t("nameValidate") });
      else this.setState({ nameBool: false });

      if (this.state.pass.length < 7)
        this.setState({ passBool: true, passWrong: i18n.t("passValidate") });
      else this.setState({ passBool: false });
    } else {
      this.setState({ ...this.state, fetching: true });
      axios({
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        url: `${api_url}/Users/Login?user=${this.state.name}&pass=${this.state.pass}`
      })
        .then(responseJson => {
          console.log(responseJson.data[0]);
          this.props.loginMethod({
            ...responseJson.data[0],
            language: this.state.language
          });
          this.setState({ ...this.state, fetching: false });
          this.props.navigation.navigate("MainMenu");
        })
        .catch(error => {
          this.props.loginMethod({});
          this.setState({ ...this.state, fetching: false });
          alert("wrong user Name or password");
        });
    }
  };
  handleLanguage = async () => {
    if (this.state.language == "en") {
      this.setState({ language: "ar" });
      i18n.locale = "ar";
    } else {
      this.setState({ language: "en" });
      i18n.locale = "en";
    }
  };

  render() {
    console.log(this.props.user);
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 0.6,
            backgroundColor: "#2e6cff",
            borderBottomLeftRadius: 100
          }}
        >
          <TouchableOpacity
            onPress={this.handleLanguage}
            style={styles.language}
          >
            {this.state.language == "en" ? (
              <Text style={styles.textLanguage}>عربى</Text>
            ) : (
              <Text style={styles.textLanguage}>English</Text>
            )}
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={require("../../assets/win.png")}
              style={{ width: 150, height: 150, marginBottom: 20 }}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Registration")}
            style={{ flex: 0.2, alignItems: "flex-end", paddingTop: 10 }}
          >
            <Text
              style={{
                textDecorationLine: "underline",
                marginHorizontal: 20,
                color: "white"
              }}
            >
              {i18n.t("createNewAccount")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TextInput
              style={styles.textinpute}
              placeholder={i18n.t("username")}
              autoCapitalize="none"
              placeholderTextColor={colors.Grey}
              onSubmitEditing={() => this._inpute && this._inpute.focus()}
              onChangeText={text => this.setState({ name: text })}
            />
            <View
              style={{
                width: width * 0.8,
                height: 25,
                marginHorizontal: width * 0.15,
                justifyContent: "center"
              }}
            >
              {this.state.nameBool ? (
                <Text style={styles.wrong}>{this.state.nameWrong}</Text>
              ) : null}
            </View>
            <TextInput
              style={[
                styles.textinpute,
                {
                  textAlign: i18n.locale == "ar" ? "right" : null
                }
              ]}
              placeholder={i18n.t("password")}
              placeholderTextColor={colors.Grey}
              onChangeText={text => this.setState({ pass: text })}
              onSubmitEditing={() => this._button && this.login()}
              secureTextEntry={true}
              ref={ref => {
                this._inpute = ref;
              }}
              autoCapitalize="none"
            />
            <View
              style={{
                width: width * 0.8,
                height: 25,
                marginHorizontal: width * 0.15,
                justifyContent: "center"
              }}
            >
              {this.state.passBool ? (
                <Text style={styles.wrong}>{this.state.passWrong}</Text>
              ) : null}
            </View>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("ForgetPassword")}
            >
              <Text style={styles.textforget}>{i18n.t("forgetPassword")}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                ref={ref => {
                  this._button = ref;
                }}
                onPress={this.login}
                style={styles.button}
              >
                {this.state.fetching ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.textButton}>{i18n.t("login")}</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                ref={ref => {
                  this._button = ref;
                }}
                onPress={this.loginFacebook}
                style={{
                  ...styles.button,
                  backgroundColor: "#415DAF",
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Entypo
                      name="facebook-with-circle"
                      style={{
                        paddingHorizontal: 5,
                        color: "white",
                        fontSize: 23
                      }}
                    />
                  </View>
                  <Text style={{ ...styles.textButton, textAlign: "center" }}>
                    {i18n.t("login_with_facebook")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
        </View>
        {/* <View style={styles.topView1}>
          <TouchableOpacity
            onPress={this.handleLanguage}
            style={styles.language}
          >
            {this.state.language == "en" ? (
              <Text style={styles.textLanguage}>عربى</Text>
            ) : (
              <Text style={styles.textLanguage}>English</Text>
            )}
          </TouchableOpacity>
          <View style={styles.flex}>
            <View style={styles.flex}>
              <Text style={styles.welcome}>{i18n.t("welcome")}</Text>

              <TextInput
                style={styles.textinpute}
                placeholder={i18n.t("username")}
                autoCapitalize="none"
                placeholderTextColor={colors.primary}
                onSubmitEditing={() => this._inpute && this._inpute.focus()}
                onChangeText={text => this.setState({ name: text })}
              />

              {this.state.nameBool ? (
                <Text style={styles.wrong}>{this.state.nameWrong}</Text>
              ) : null}

              <TextInput
                style={[
                  styles.textinpute,
                  {
                    marginTop: 20,
                    textAlign: i18n.locale == "ar" ? "right" : null
                  }
                ]}
                placeholder={i18n.t("password")}
                placeholderTextColor={colors.primary}
                onChangeText={text => this.setState({ pass: text })}
                onSubmitEditing={() => this._button && this.login()}
                secureTextEntry={true}
                ref={ref => {
                  this._inpute = ref;
                }}
                autoCapitalize="none"
              />
              {this.state.passBool ? (
                <Text style={styles.wrong}>{this.state.passWrong}</Text>
              ) : null}
            </View>
            <View style={{ flex: 1.4 }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("ForgetPassword")}
              >
                <Text style={styles.textforget}>
                  {i18n.t("forgetPassword")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                ref={ref => {
                  this._button = ref;
                }}
                onPress={this.login}
                style={styles.button}
              >
                {this.state.fetching ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.textButton}>{i18n.t("login")}</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Registration")}
              >
                <Text style={styles.textforget}>
                  {i18n.t("createNewAccount")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View> */}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginMethod: user => {
      dispatch({ type: EDIT_USER, value: user });
    }
  };
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelloWorldApp);
