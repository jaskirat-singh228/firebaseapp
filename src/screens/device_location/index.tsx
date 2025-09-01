import Geolocation from '@react-native-community/geolocation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BaseText from 'components/base_components/base_text';
import FullScreenContainer from 'components/hoc/full_screen_container';
import { BackWithTitleHeader } from 'components/molecules/back_with_title_view';
import React from 'react';
import { View } from 'react-native';
import { TLocationCoords } from 'screens/bottom_tab_dash_board/home';
import { AppStackParamList } from 'types/navigation_types';
import { showToast } from 'utilities/utils';

type LocationScreenProps = NativeStackScreenProps<AppStackParamList, 'LocationScreen'>;

const LocationScreen: React.FC<LocationScreenProps> = () => {
	const [location, setLocation] = React.useState<TLocationCoords | null>(null);

	React.useEffect(() => {
		Geolocation.getCurrentPosition(
			(position) => {
				setLocation(position.coords);
			},
			(error) => {
				showToast(error.message, 'error');
			},
			{ enableHighAccuracy: true, timeout: 60000 },
		);
	}, []);

	return (
		<FullScreenContainer>
			<BackWithTitleHeader title='Location' />
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<BaseText>Latitude: {location?.latitude ?? ''}</BaseText>
				<BaseText>Longitude: {location?.longitude ?? ''}</BaseText>
			</View>
		</FullScreenContainer>
	);
};

export default LocationScreen;
