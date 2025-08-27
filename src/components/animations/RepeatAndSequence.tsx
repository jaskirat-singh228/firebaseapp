import FullScreenContainer from 'components/hoc/full_screen_container';
import AnimatedLoaderButton from 'components/molecules/animated_loader_button';
import { BackWithTitleHeader } from 'components/molecules/back_with_title_view';
import React from 'react';
import { View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from 'react-native-reanimated';
import { globalStyle } from 'utilities/global_styles';
import { ms } from 'utilities/scale_utils';

const BOX_SIZE = ms(200);

export const RepeatAndSequence = () => {
	const [isAnimated, setIsAnimated] = React.useState<boolean>(false);
	const translateY = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
	}));

	React.useEffect(() => {
		if (isAnimated) {
			translateY.value = withRepeat(
				withSequence(
					withTiming(BOX_SIZE + BOX_SIZE, { duration: 500 }),
					withTiming(BOX_SIZE - BOX_SIZE, { duration: 500 }),
				),
				-1,
			);
		}
	}, [isAnimated]);

	return (
		<FullScreenContainer>
			<BackWithTitleHeader title='Repeat And Sequence Animation' />
			<View
				style={[
					globalStyle.screenContainer,
					{ alignItems: 'center', justifyContent: 'center', gap: ms(20) },
				]}
			>
				<Animated.View
					style={[
						{ height: BOX_SIZE, width: BOX_SIZE, backgroundColor: 'red' },
						animatedStyle,
					]}
				/>
				<AnimatedLoaderButton
					onPress={() => {
						setIsAnimated((prev) => !prev);
						translateY.set(0);
					}}
					title='Press'
				/>
			</View>
		</FullScreenContainer>
	);
};
