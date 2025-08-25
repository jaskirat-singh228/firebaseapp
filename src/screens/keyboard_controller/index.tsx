import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FullScreenContainer from 'components/hoc/full_screen_container';
import { BackWithTitleHeader } from 'components/molecules/back_with_title_view';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import {
	KeyboardAvoidingView,
	KeyboardGestureArea,
	useKeyboardHandler,
	useReanimatedKeyboardAnimation,
} from 'react-native-keyboard-controller';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { AppStackParamList } from 'types/navigation_types';
import { SCREEN_WIDTH } from 'utilities/constants';
import { vs } from 'utilities/scale_utils';

type KeyBoardControllerScreenProps = NativeStackScreenProps<
	AppStackParamList,
	'KeyBoardControllerScreen'
>;

const KeyBoardControllerScreen: React.FC<KeyBoardControllerScreenProps> = () => {
	const { height, progress } = useReanimatedKeyboardAnimation();

	const animatedBoxStyle = useAnimatedStyle(() => {
		const s = interpolate(progress.value, [0, 1], [1, 2]);
		return {
			transform: [{ translateY: height.value }, { scale: s }],
		};
	});

	useKeyboardHandler(
		{
			// onStart: (e) => {
			// 	'worklet';
			// 	const willKeyboardAppear = e.progress === 1;
			// },
			onMove: (e) => {
				'worklet';
				progress.value = e.progress;
				height.value = e.height;
			},
			onInteractive: (e) => {
				'worklet';
				progress.value = e.progress;
				height.value = e.height;
			},
			onEnd: (e) => {
				'worklet';
				progress.value = e.progress;
				height.value = e.height;
			},
		},
		[],
	);

	return (
		<FullScreenContainer>
			<BackWithTitleHeader title='Keyboard Controller' />
			<KeyboardGestureArea interpolator='ios' style={styles.container}>
				{/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
				<View style={{ flex: 1 }}>
					<KeyboardAvoidingView
						style={styles.container}
						behavior={'padding'}
						keyboardVerticalOffset={vs(115)}
					>
						<Animated.View
							style={[
								{
									width: 50,
									height: 50,
									backgroundColor: '#17fc03',
									borderRadius: 15,
								},
								animatedBoxStyle,
							]}
						/>
						<TextInput
							style={{
								width: SCREEN_WIDTH,
								height: 50,
								backgroundColor: 'yellow',
							}}
							placeholder='Type here...'
						/>
					</KeyboardAvoidingView>
				</View>
				{/* </TouchableWithoutFeedback> */}
			</KeyboardGestureArea>
		</FullScreenContainer>
	);
};

export default KeyBoardControllerScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
});
