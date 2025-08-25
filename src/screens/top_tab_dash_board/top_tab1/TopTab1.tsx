import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import BaseTextInput from 'components/base_components/base_text_input';
import AnimatedLoaderButton from 'components/molecules/animated_loader_button';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { TopTabNavigatorParamList } from 'types/navigation_types';
import { vs } from 'utilities/scale_utils';

type TopTab1Props = MaterialTopTabScreenProps<TopTabNavigatorParamList, 'TopTab1'>;

const TopTab1: React.FC<TopTab1Props> = () => {
	const [value, setValue] = React.useState('');

	return (
		<TouchableWithoutFeedback
			style={{
				flex: 1,
			}}
			onPress={Keyboard.dismiss}
		>
			<KeyboardAvoidingView
				behavior={'padding'}
				keyboardVerticalOffset={vs(130)}
				style={{
					flex: 1,
					alignItems: 'center',
				}}
			>
				<ScrollView
					style={{
						flex: 1,
						width: '100%',
					}}
				>
					<BaseTextInput placeholder='Enter...' value={value} onChangeText={setValue} />
				</ScrollView>
				<AnimatedLoaderButton title='Press' onPress={() => {}} />
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
};

export default TopTab1;
