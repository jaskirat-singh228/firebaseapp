import crashlytics from '@react-native-firebase/crashlytics';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AnimatedLoaderButton from 'components/molecules/animated_loader_button';
import { useFirebaseNotifications } from 'hooks/firebase/useFirebaseNotifications';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MaterialBottomTabScreenProps } from 'react-native-paper';
import { AppStackParamList, BottomTabNavigatorParamList } from 'types/navigation_types';
import { AnalyticEvent } from 'utilities/analytic_event';
import { SCREEN_WIDTH } from 'utilities/constants';
import { ms, vs } from 'utilities/scale_utils';
// Make sure this path points to your actual Redux store file where RootState is defined

type HomeScreenProps = MaterialBottomTabScreenProps<BottomTabNavigatorParamList, 'HomeScreen'>;

type TButton = { id: number; title: string };

const HomeScreen: React.FC<HomeScreenProps> = () => {
	// initialize firebase messaging
	useFirebaseNotifications();
	const appStackParamList = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

	React.useEffect(() => {
		AnalyticEvent({
			eventName: 'HomeScreenRender',
			eventPayload: {
				name: 'Home_Screen_Render',
			},
		});
	}, []);

	// React.useEffect(() => {
	//   , '<<<<<<<<<<before');

	//   function abc() {
	//     return 'Hello from abc';
	//   }

	//   , '<<<<<<<<<<after');
	// }, []);

	const buttonList: TButton[] = [
		{ id: 1, title: 'Analytic Button' },
		{ id: 2, title: 'Crashlytic Button' },
		{ id: 3, title: 'Todo List [online(Firebase)/offline(SQLite)]' },
		{ id: 4, title: 'Reducer (Multiple State Manager)' },
		{ id: 5, title: 'Keyboard Controller' },
		{ id: 6, title: 'Animations' },
		{ id: 7, title: 'Top Tab Bars' },
		{ id: 8, title: 'Device Contacts' },
	];

	const handleButtonPress = (button: TButton) => {
		switch (button.title) {
			case 'Analytic Button':
				AnalyticEvent({
					eventName: 'analyticButtonPress',
					eventPayload: {
						name: 'Jaskirat Singh',
						email: 'jaskirat.singh@weexcel.in',
					},
				});
				return;
			case 'Crashlytic Button':
				crashlytics().crash();
				return;
			case 'Todo List [online(Firebase)/offline(SQLite)]':
				appStackParamList.navigate('TodoScreen', { id: '' });
				return;
			case 'Native Modules':
				appStackParamList.navigate('NativeModuleScreen');
				return;
			case 'Reducer (Multiple State Manager)':
				appStackParamList.navigate('ReducerScreen');
				return;
			case 'Keyboard Controller':
				appStackParamList.navigate('KeyBoardControllerScreen');
				return;
			case 'Animations':
				appStackParamList.navigate('AppWelcomeAnimationScreen');
				return;
			case 'Top Tab Bars':
				appStackParamList.navigate('TopTabDashBoardScreen');
				return;
			case 'Device Contacts':
				appStackParamList.navigate('ContactScreen');
				return;
			default:
				return '';
		}
	};

	return (
		<ScrollView style={style.mainContainer}>
			<View style={style.container}>
				{buttonList.map((button: TButton) => (
					<AnimatedLoaderButton
						key={button.id}
						title={button.title}
						alignSelfCenter
						width={SCREEN_WIDTH * 0.8}
						onPress={() => handleButtonPress(button)}
					/>
				))}
			</View>
		</ScrollView>
	);
};

export default HomeScreen;

const style = StyleSheet.create({
	mainContainer: {
		flex: 1,
		width: '100%',
		backgroundColor: '#F5F5F5',
		padding: ms(15),
	},
	container: {
		width: '100%',
		gap: vs(10),
		alignItems: 'center',
	},
});
