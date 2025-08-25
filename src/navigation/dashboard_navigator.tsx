import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBarView from 'components/organisms/bottom_tab_bar';
import React from 'react';
import HomeScreen from 'screens/dashboard/home';
import ProfileScreen from 'screens/dashboard/profile';
import SettingsScreen from 'screens/dashboard/settings';
import { DashbordBottomTabBarParamList } from 'types/navigation_types';

const TabBar = createBottomTabNavigator<DashbordBottomTabBarParamList>();

const DashboardNavigator: React.FC = () => {
	return (
		<TabBar.Navigator
			tabBar={(props) => <BottomTabBarView {...props} />}
			screenOptions={{
				headerShown: false,
			}}
		>
			<TabBar.Screen name={'HomeScreen'} component={HomeScreen} />
			<TabBar.Screen name={'ProfileScreen'} component={ProfileScreen} />
			<TabBar.Screen name={'SettingsScreen'} component={SettingsScreen} />
		</TabBar.Navigator>
	);
};

export default DashboardNavigator;
