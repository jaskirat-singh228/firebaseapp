import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ToptabsDashBoardNavigator from 'navigation/top_tab_navigator';
import React from 'react';
import { AppStackParamList } from 'types/navigation_types';

type DashbordScreenProps = NativeStackScreenProps<AppStackParamList, 'DashbordTopTabBarScreen'>;

const DashbordTopTabBarScreen: React.FC<DashbordScreenProps> = () => {
	return <ToptabsDashBoardNavigator />;
};

export default DashbordTopTabBarScreen;
