import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import BaseTextInput from 'components/base_components/base_text_input';
import AnimatedLoaderButton from 'components/molecules/animated_loader_button';
import useKeyboard from 'hooks/useKeyboard';
import React from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { TopTabNavigatorParamList } from 'types/navigation_types';
import { IS_ANDROID } from 'utilities/constants';

type TopTab1Props = MaterialTopTabScreenProps<TopTabNavigatorParamList, 'TopTab1'>;

const TopTab1: React.FC<TopTab1Props> = () => {
	const [value, setValue] = React.useState('');
	const { isKeyboardVisible } = useKeyboard();

	return (
		<KeyboardAvoidingView
			behavior={IS_ANDROID ? 'height' : 'padding'}
			keyboardVerticalOffset={isKeyboardVisible ? 128 : 0}
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
				keyboardDismissMode='interactive'
				keyboardShouldPersistTaps='handled'
			>
				<BaseTextInput placeholder='Enter...' value={value} onChangeText={setValue} />
				<BaseTextInput placeholder='Enter...' value={value} onChangeText={setValue} />
				<BaseTextInput placeholder='Enter...' value={value} onChangeText={setValue} />
				<BaseTextInput placeholder='Enter...' value={value} onChangeText={setValue} />
				<BaseTextInput placeholder='Enter...' value={value} onChangeText={setValue} />
				<BaseTextInput placeholder='Enter...' value={value} onChangeText={setValue} />
				<BaseTextInput placeholder='Enter...' value={value} onChangeText={setValue} />
				<BaseTextInput placeholder='Enter...' value={value} onChangeText={setValue} />
				<BaseTextInput placeholder='Enter...' value={value} onChangeText={setValue} />
				<BaseTextInput placeholder='Enter...' value={value} onChangeText={setValue} />
				<BaseTextInput placeholder='Enter...' value={value} onChangeText={setValue} />
				<BaseTextInput placeholder='Enter...' value={value} onChangeText={setValue} />
			</ScrollView>
			<AnimatedLoaderButton title='Press' onPress={() => {}} />
		</KeyboardAvoidingView>
	);
};

export default TopTab1;
