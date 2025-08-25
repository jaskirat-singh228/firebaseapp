import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { AppStackParamList } from 'types/navigation_types';
import {
	foregroundMessageHandler,
	notificationNavigationHandler,
	onBackgroundNotificationEvent,
	onForegroundNotificationEvent,
	requestNotificationPermissions,
} from 'utilities/notifee_notification_handle';

export const useFirebaseNotifications = () => {
	const [notificationPermissionEnabled, setNotificationPermissionEnabled] =
		React.useState<boolean>(false);
	const [fcmToken, setFcmToken] = React.useState<string>('');
	const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

	// Request permission & get token
	const getFcmToken = async () => {
		const permission = await requestNotificationPermissions();
		setNotificationPermissionEnabled(permission);

		if (permission) {
			try {
				const token = await messaging().getToken();
				if (token) {
					console.log('FCM_TOKEN ==> ', token);
					setFcmToken(token);
				} else {
					console.log('Failed to get FCM token');
				}
			} catch (error) {
				console.error('Error getting FCM token:', error);
			}
		}
	};

	React.useEffect(() => {
		getFcmToken();
		onForegroundNotificationEvent(navigation);
		onBackgroundNotificationEvent(navigation);
	}, []);

	// Setup notification listeners after permission & token
	React.useEffect(() => {
		if (notificationPermissionEnabled && fcmToken) {
			const unsubscribe = messaging().onMessage(foregroundMessageHandler);
			messaging().onNotificationOpenedApp((remoteMessage) => {
				notificationNavigationHandler(remoteMessage?.data ?? {}, navigation);
			});

			messaging()
				.getInitialNotification()
				.then((remoteMessage) => {
					if (remoteMessage) {
						notificationNavigationHandler(remoteMessage?.data ?? {}, navigation);
					}
				});

			return unsubscribe;
		}
	}, [notificationPermissionEnabled, fcmToken]);
};
