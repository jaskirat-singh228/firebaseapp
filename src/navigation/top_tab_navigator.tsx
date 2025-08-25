import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FullScreenContainer from 'components/hoc/full_screen_container';
import { BackWithTitleHeader } from 'components/molecules/back_with_title_view';
import TopTab1 from 'screens/top_tabs/top_tab1/TopTab1';
import TopTab2 from 'screens/top_tabs/top_tab2/TopTab2';
import { DashbordTopTabBarParamList } from 'types/navigation_types';

const Tab = createMaterialTopTabNavigator<DashbordTopTabBarParamList>();

const ToptabsDashBoardNavigator = () => {
	return (
		<FullScreenContainer>
			<BackWithTitleHeader title='Top Tab Bars' />
			<Tab.Navigator>
				<Tab.Screen name='TopTab1' component={TopTab1} />
				<Tab.Screen name='TopTab2' component={TopTab2} />
			</Tab.Navigator>
		</FullScreenContainer>
	);
};

export default ToptabsDashBoardNavigator;
