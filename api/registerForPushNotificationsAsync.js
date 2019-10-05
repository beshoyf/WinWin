import {   Notifications } from 'expo';
import { AsyncStorage, Clipboard, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';

export default (async function RegisterForPushNotificationsAsync() {
	// Remote notifications do not work in simulators, only on device
	// if (!Constants.isDevice) {
	// 	return;
	// }

	// Android remote notification permissions are granted during the app
	// install, so this will only ask on iOS
	let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

	// Stop here if the user did not grant permissions
	if (status !== 'granted') {
		return;
	}

	// Get the token that uniquely identifies this device
	let token = await Notifications.getExpoPushTokenAsync();

	AsyncStorage.setItem('token', token);
	// console.log(token);
	// Clipboard.setString(token);
	// Alert.alert("copied to your clipboard", token)
});
