import notifee, {
	AndroidImportance,
	AndroidVisibility,
	EventType,
	NotificationSettings,
	RepeatFrequency,
	TimestampTrigger,
	TriggerType,
} from '@notifee/react-native';
import { AuthorizationStatus, FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from 'types/navigation_types';
import { IS_IOS } from './constants';

export type NotificationData = {
	[key: string]: string | object | number;
};

const CHANNEL_ID = 'custom_channel';
const CHANNEL_NAME = 'My Custom Channel';

// create a chennal
const createNotificationChannel = async (): Promise<string> => {
	return await notifee.createChannel({
		id: CHANNEL_ID,
		name: CHANNEL_NAME,
		importance: AndroidImportance.HIGH,
		visibility: AndroidVisibility.PUBLIC,
	});
};

export const displayNotification = async (remoteMsg: FirebaseMessagingTypes.RemoteMessage) => {
	try {
		const channelId = await createNotificationChannel();
		const data = remoteMsg?.data;
		const notification = remoteMsg?.notification; // for ios

		const title = IS_IOS ? (notification?.title ?? '') : (data?.title ?? '')?.toString();
		const body = IS_IOS ? (notification?.body ?? '') : (data?.body ?? '')?.toString();

		// notifee displayNotification
		const notificationId = await notifee.displayNotification({
			title: title,
			body: body,
			data: data,
			android: {
				channelId,
				pressAction: {
					id: 'default',
				},
				importance: AndroidImportance.HIGH,
				visibility: AndroidVisibility.PUBLIC,
			},
		});

		return notificationId;
	} catch (error) {
		console.error('Error displaying notification:', error);
	}
};

// Requests permissions
export const requestNotificationPermissions = async (): Promise<boolean> => {
	try {
		const settings: NotificationSettings = await notifee.requestPermission();
		return settings.authorizationStatus === AuthorizationStatus.AUTHORIZED;
	} catch (error) {
		console.error('Error requesting notification permissions:', error);
		return false;
	}
};

// Foreground notification event (handle on user press)
export const onForegroundNotificationEvent = (
	navigation: NativeStackNavigationProp<AppStackParamList>,
): (() => void) => {
	return notifee.onForegroundEvent(({ type, detail }) => {
		if (type === EventType.PRESS) {
			notificationNavigationHandler(detail.notification?.data, navigation);
		}
	});
};

// Background notification event (handle on user press)
export const onBackgroundNotificationEvent = (
	navigation: NativeStackNavigationProp<AppStackParamList>,
) => {
	return notifee.onBackgroundEvent(async ({ type, detail }) => {
		if (type === EventType.PRESS) {
			notificationNavigationHandler(detail.notification?.data, navigation);
		}
	});
};

// Notification navigation logic
export const notificationNavigationHandler = (
	data: NotificationData | undefined,
	navigation: NativeStackNavigationProp<AppStackParamList>,
): void => {
	const type = Number(data?.type);

	switch (Number(type)) {
		case 1:
			navigation.navigate('DashBoardScreen');
			break;
		default:
			return;
	}
};

export const displayTriggerNotification = async (
	title: string,
	body: string,
	timestamp: number,
	repeatFrequency?: RepeatFrequency,
): Promise<string | undefined> => {
	try {
		const channelId = await createNotificationChannel();

		const trigger: TimestampTrigger = {
			type: TriggerType.TIMESTAMP,
			timestamp,
			repeatFrequency,
		};

		const notificationId = await notifee.createTriggerNotification(
			{
				title,
				body,
				android: { channelId },
			},
			trigger,
		);

		return notificationId;
	} catch (error) {
		console.error('Error displaying trigger notification:', error);
	}
};

export const getTriggerNotificationIds = async (): Promise<string[]> => {
	try {
		return await notifee.getTriggerNotificationIds();
	} catch (error) {
		console.error('Error getting trigger notifications:', error);
		return [];
	}
};

export const cancelTriggerNotifications = async (notificationIds?: string[]): Promise<void> => {
	try {
		await notifee.cancelTriggerNotifications(notificationIds);
	} catch (error) {
		console.error('Error canceling trigger notifications:', error);
	}
};

export const cancelAllNotifications = async (): Promise<void> => {
	try {
		await notifee.cancelAllNotifications();
	} catch (error) {
		console.error('Error canceling all notifications:', error);
	}
};

export const cancelNotification = async (notificationId: string, tag?: string): Promise<void> => {
	try {
		await notifee.cancelNotification(notificationId, tag);
	} catch (error) {
		console.error('Error canceling notification:', error);
	}
};

// Foreground message handler (for show the notification)
export const foregroundMessageHandler = async (
	message: FirebaseMessagingTypes.RemoteMessage,
): Promise<void> => {
	await displayNotification(message);
};

// Background message handler (for show the notification)
export const backgroundMessageHandler = async (
	message: FirebaseMessagingTypes.RemoteMessage,
): Promise<void> => {
	if (message?.data ?? undefined) {
		await displayNotification(message);
	}
};
