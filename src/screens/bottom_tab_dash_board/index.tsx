import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BottomTabNavigator from 'navigation/bottom_tab_navigator';
import React from 'react';
import { AppStackParamList } from 'types/navigation_types';

type BottomTabNavigatorProps = NativeStackScreenProps<AppStackParamList, 'BottomTabNavigator'>;

const BottomTabDashBoardScreen: React.FC<BottomTabNavigatorProps> = () => {
	return <BottomTabNavigator />;
};

export default BottomTabDashBoardScreen;
