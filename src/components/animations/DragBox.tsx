import BaseText from 'components/base_components/base_text';
import FullScreenContainer from 'components/hoc/full_screen_container';
import { BackWithTitleHeader } from 'components/molecules/back_with_title_view';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { globalStyle } from 'utilities/global_styles';

export const DragBox = () => {
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const pan = Gesture.Pan()
		.onUpdate((e) => {
			translateX.value = e.translationX;
			translateY.value = e.translationY;
		})
		.onFinalize(() => {
			translateX.value = withSpring(0);
			translateY.value = withSpring(0);
		});

	//same as onFinalize:
	// .onEnd(() => {
	//   translateX.value = withSpring(0);
	//   translateY.value = withSpring(0);
	// });

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
	}));

	return (
		<FullScreenContainer>
			<BackWithTitleHeader title='Drag Box' />
			<View style={globalStyle.screenContainer}>
				<GestureDetector gesture={pan}>
					<Animated.View
						style={[{ width: 100, height: 100, backgroundColor: 'red' }, animatedStyle]}
					></Animated.View>
				</GestureDetector>
				<BaseText>{'Drag the box'}</BaseText>
			</View>
		</FullScreenContainer>
	);
};
