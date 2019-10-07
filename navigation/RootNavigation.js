import React, { Component } from "react";
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import { TabBar } from "react-native-animated-nav-tab-bar";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  Octicons
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Login from "../containers/login/login";
import ForgetPassword from "../containers/forgetPassword/forgetPassword";
import Registration from "../containers/registration/registration";
import MainMenu from "../containers/mainMenu/mainMenu";
import Categories from "../containers/categories/categories";
import Search from "../containers/search/search";
import Notifications from "../containers/notifications/notifications";
import QrCode from "../containers/qrCode/qrcode";
import QrActivate from "../containers/qrActivate/qractivate";
import Help from "../containers/help/help";
import UserProfile from "../containers/userProfile/userProfile";
import Brand from "../containers/brand/brand";
import Offer from "../containers/offer/offer";
import Branch from "../containers/branch/branch";
import Order from "../containers/order/order";
import Contact from "../containers/ContactUs";
import Privacy from "../containers/privacy/privacy";
import Basket from "../containers/basket/basket";
import Images from "../containers/images";
import favorite from "../containers/favourite/favourite";
import Setting from "../containers/drawerMenu/drawerMenu";
import CustomDrawerContent from "./CustomDrawerContent";
import { connect } from "react-redux";
import { compose } from "redux";

/*const DrawerStack = createDrawerNavigator({
    Login: { screen: Login, navigationOptions: { title: "Login" } },

}, {
        contentComponent: CustomDrawerContent
    })
    */
const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: MainMenu,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Octicons name="home" size={30} color={tintColor} />
        )
      }
    },
    Order: {
      screen: Order,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="opencart" size={30} color={tintColor} />
        )
      }
    },
    favorite: {
      screen: favorite,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="heart-multiple-outline"
            size={30}
            color={tintColor}
          />
        )
      }
    },

    Setting: {
      screen: Setting,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name="ios-menu"
            size={30}
            color={tintColor}
            focused={focused}
          />
        )
      }
    }
  },

  {
    swipeEnabled: true,
    animationEnabled: true,
    initialRouteName: "Home",
    tabBarOptions: {
      //activeTintColor: Colors.primary,
      showIcon: true,
      showLabel: false,
      upperCaseLabel: false,
      //  indicatorStyle: { backgroundColor: Colors.primary },
      // inactiveTintColor: Colors.Grey,
      scrollEnabled: false,
      allowFontScaling: true,
      tabStyle: { borderTopWidth: 0.3 }

      //style: { backgroundColor: Colors.white }
    },
    tabBarComponent: props => (
      <TabBar
        activeColors={["#0973b9", "#8e87d6", "#fc81d1", "#42a5f5"]} // or activeColors={'#e6b580'}
        activeTabBackgrounds={["#fff", "#fff", "#fff", "#fff"]} // or activeTabBackgrounds={'#ede7e6'}
        {...props}
      />
    )
  }
);
const appStack1 = createStackNavigator(
  {
    Login: { screen: Login, navigationOptions: { header: null } },
    ForgetPassword: {
      screen: ForgetPassword,
      navigationOptions: { header: null }
    },
    Registration: { screen: Registration, navigationOptions: { header: null } },
    MainMenu: { screen: TabNavigator, navigationOptions: { header: null } },
    Categories: { screen: Categories, navigationOptions: { header: null } },
    Search: { screen: Search, navigationOptions: { header: null } },
    Notifications: {
      screen: Notifications,
      navigationOptions: { header: null }
    },
    Setting: { screen: TabNavigator, navigationOptions: { header: null } },
    QrCode: { screen: QrCode, navigationOptions: { header: null } },
    Help: { screen: Help, navigationOptions: { header: null } },
    UserProfile: { screen: UserProfile, navigationOptions: { header: null } },
    Brand: { screen: Brand, navigationOptions: { header: null } },
    Offer: {
      screen: Offer,
      navigationOptions: { header: null },
      path: "offer/:offerId/:categoryName/:brandName"
    },
    Branch: { screen: Branch, navigationOptions: { header: null } },
    Contact: {
      screen: Contact,
      navigationOptions: { header: null }
    },
    Order: { screen: Order, navigationOptions: { header: null } },
    Basket: { screen: Basket, navigationOptions: { header: null } },
    QrActivate: { screen: QrActivate, navigationOptions: { header: null } },
    Images: { screen: Images, navigationOptions: { header: null } }
  },
  {
    initialRouteName: "Login"
  }
);

const appStack2 = createStackNavigator(
  {
    Login: { screen: Login, navigationOptions: { header: null } },
    ForgetPassword: {
      screen: ForgetPassword,
      navigationOptions: { header: null }
    },
    Contact: {
      screen: Contact,
      navigationOptions: { header: null }
    },
    Registration: { screen: Registration, navigationOptions: { header: null } },
    MainMenu: { screen: TabNavigator, navigationOptions: { header: null } },
    Categories: { screen: Categories, navigationOptions: { header: null } },
    Search: { screen: Search, navigationOptions: { header: null } },
    Notifications: {
      screen: Notifications,
      navigationOptions: { header: null }
    },
    Setting: { screen: TabNavigator, navigationOptions: { header: null } },
    QrCode: { screen: QrCode, navigationOptions: { header: null } },
    Help: { screen: Help, navigationOptions: { header: null } },
    UserProfile: { screen: UserProfile, navigationOptions: { header: null } },
    Brand: { screen: Brand, navigationOptions: { header: null } },
    Offer: {
      screen: Offer,
      navigationOptions: { header: null },
      path: "offer/:offerId/:categoryName/:brandName"
    },
    Branch: { screen: Branch, navigationOptions: { header: null } },
    Order: { screen: Order, navigationOptions: { header: null } },
    Basket: { screen: Basket, navigationOptions: { header: null } },
    QrActivate: { screen: QrActivate, navigationOptions: { header: null } },
    Privacy: { screen: Privacy, navigationOptions: { header: null } },
    Images: { screen: Images, navigationOptions: { header: null } }
  },
  {
    initialRouteName: "MainMenu"
  }
);

export const LoginStack = createAppContainer(appStack1);
export const MenuStack = createAppContainer(appStack2);
