import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TopTabNavigator from 'navigation/top_tab_navigator';
import React from 'react';
import { AppStackParamList } from 'types/navigation_types';

type TopTabDashBoardScreenProps = NativeStackScreenProps<
	AppStackParamList,
	'TopTabDashBoardScreen'
>;

const TopTabDashBoardScreen: React.FC<TopTabDashBoardScreenProps> = () => {
	return <TopTabNavigator />;
};

export default TopTabDashBoardScreen;
