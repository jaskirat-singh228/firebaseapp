import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useThemeContext } from 'context/theme_provider';
import AppNavigator from 'navigation/app_navigator';
import AuthenticationNavigator from 'navigation/auth_navigator';
import React, { useRef } from 'react';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { getNotificationData } from 'utilities/initial_notification_data';

const RootStack = createNativeStackNavigator();
const RootNavigator: React.FC = () => {
	const userLoginStatus = useSelector((state: RootState) => state.loginData);
	const { isDarkTheme } = useThemeContext();
	const theme = useTheme();
	const navigationRef = useRef<NavigationContainerRef<ReactNavigation.RootParamList>>(null);
	const [navReady, setNavReady] = React.useState(false);

	React.useEffect(() => {
		if (navReady) {
			const data = getNotificationData();
			if (data) {
				if (navigationRef.current) {
					// notificationNavigationHandler(data, navigationRef.current);
				}
			}
		}
	}, [navReady]);

	const linking = {
		prefixes: ['https://firebase-app-ruddy.vercel.app'],
		config: {
			screens: {
				AppNavigator: {
					path: 'app',
					screens: {
						TodoScreen: 'post/:id',
					},
				},
			},
		},
	};

	return (
		<NavigationContainer
			linking={linking}
			ref={navigationRef}
			onReady={() => {
				setTimeout(() => {
					setNavReady(true);
				}, 4000);
			}}
			theme={{
				dark: isDarkTheme,
				colors: {
					primary: theme.colors.primary,
					background: theme.colors.background,
					card: theme.colors.background,
					text: theme.colors.textColor.regular,
					border: theme.colors.primary,
					notification: theme.colors.background,
				},
				fonts: {
					regular: {
						fontFamily: theme.fonts.regular.fontFamily,
						fontWeight: 'normal',
					},
					medium: {
						fontFamily: theme.fonts.semiBold.fontFamily,
						fontWeight: 'normal',
					},
					bold: {
						fontFamily: theme.fonts.bold.fontFamily,
						fontWeight: 'bold',
					},
					heavy: {
						fontFamily: theme.fonts.bold.fontFamily,
						fontWeight: 'bold',
					},
				},
			}}
		>
			<RootStack.Navigator
				screenOptions={{
					headerShown: false,
					statusBarStyle: 'light',
					statusBarTranslucent: false,
					statusBarBackgroundColor: theme.colors.statusBar.backgroundColor,
				}}
			>
				{userLoginStatus.isUserLoggedIn ? (
					<RootStack.Screen name={'AppNavigator'} component={AppNavigator} />
				) : (
					<RootStack.Screen
						name={'AuthenticationNavigator'}
						component={AuthenticationNavigator}
					/>
				)}
			</RootStack.Navigator>
		</NavigationContainer>
	);
};

export default RootNavigator;
