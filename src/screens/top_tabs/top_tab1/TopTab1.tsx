import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import BaseTextInput from 'components/base_components/base_text_input';
import AnimatedLoaderButton from 'components/molecules/animated_loader_button';
import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { DashbordTopTabBarParamList } from 'types/navigation_types';
import { ms } from 'utilities/scale_utils';

type TopTab1Props = MaterialTopTabScreenProps<DashbordTopTabBarParamList, 'TopTab1'>;

const TopTab1: React.FC<TopTab1Props> = () => {
	const [value, setValue] = React.useState('');

	return (
		<View style={{ flex: 1 }}>
			<KeyboardAvoidingView
				style={{
					height: '100%',
					width: '100%',
				}}
				behavior='padding'
			>
				<BaseTextInput placeholder='Enter...' value={value} onChangeText={setValue} />
				<View style={{ position: 'absolute', alignItems: 'center', bottom: ms(10) }}>
					<AnimatedLoaderButton title='Press' onPress={() => {}} />
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default TopTab1;
