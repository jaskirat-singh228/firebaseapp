import analytics from '@react-native-firebase/analytics';

export const AnalyticEvent = async ({ eventName = '', eventPayload = {} }) => {
	try {
		await analytics().logEvent(eventName, eventPayload);
	} catch (error) {
		console.error(error, '======> ANALYTICS ERROR');
	}
};
