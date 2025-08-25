import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import LoginScreen from 'screens/authentication/login';
import SignUpScreen from 'screens/authentication/sign_up';
import SplashScreen from 'screens/splash_screen';
import { RootState } from 'store';
import { AuthenticationStackParamList } from 'types/navigation_types';

const Stack = createNativeStackNavigator<AuthenticationStackParamList>();

const AuthenticationNavigator: React.FC = () => {
	const theme = useTheme();
	const userLoginStatus = useSelector((state: RootState) => state.loginData);

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				statusBarStyle: 'light',
				statusBarTranslucent: false,
				statusBarBackgroundColor: theme.colors.statusBar.backgroundColor,
			}}
			initialRouteName={userLoginStatus.isUserLoggedOut ? 'LoginScreen' : 'SplashScreen'}
		>
			<Stack.Screen component={SplashScreen} name={'SplashScreen'} />
			<Stack.Screen component={SignUpScreen} name={'SignUpScreen'} />
			<Stack.Screen component={LoginScreen} name={'LoginScreen'} />
		</Stack.Navigator>
	);
};

export default AuthenticationNavigator;
