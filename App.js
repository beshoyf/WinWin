import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { persistStore, persistReducer } from "redux-persist";
// import storage from 'redux-persist/lib/storage'
import { AsyncStorage } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { connect } from "react-redux";
import Loading from "./containers/Loading";
import {  Notifications } from 'expo';
import RegisterForPushNotificationsAsync from './api/registerForPushNotificationsAsync';

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const persist_reducer = persistReducer(persistConfig, rootReducer);

const isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

class App extends Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }
  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    RegisterForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };
  render() {
    const store = createStore(persist_reducer);
    const persistor = persistStore(store);

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Loading />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
