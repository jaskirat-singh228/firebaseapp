import FullScreenContainer from 'components/hoc/full_screen_container';
import AnimatedLoaderButton from 'components/molecules/animated_loader_button';
import { BackWithTitleHeader } from 'components/molecules/back_with_title_view';
import React, { useState } from 'react';
import { View } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { SCREEN_WIDTH } from 'utilities/constants';
import { globalStyle } from 'utilities/global_styles';
import { ms } from 'utilities/scale_utils';

const BOX_SIZE = 150;

export const InterPolateAnimation = () => {
	const offset = useSharedValue<number>(0);
	const [isAnimated, setIsAnimated] = useState<boolean>(false);

	const animatedStyles = useAnimatedStyle(() => ({
		opacity: interpolate(offset.value, [0, SCREEN_WIDTH - BOX_SIZE], [1, 0.3], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}),
		transform: [{ translateX: offset.value }],
	}));

	React.useEffect(() => {
		if (isAnimated) {
			offset.value = withTiming(SCREEN_WIDTH - BOX_SIZE, { duration: 2000 }, () => {
				offset.set(0);
			});
			setIsAnimated(false);
		}
	}, [isAnimated]);

	return (
		<FullScreenContainer>
			<BackWithTitleHeader title='Interpolation Animation' />
			<View
				style={[
					globalStyle.screenContainer,
					{ alignItems: 'center', justifyContent: 'center', gap: ms(20) },
				]}
			>
				<Animated.View
					style={[
						{
							height: BOX_SIZE,
							width: BOX_SIZE,
							backgroundColor: 'red',
							borderRadius: 20,
						},
						animatedStyles,
					]}
				/>
				<AnimatedLoaderButton
					onPress={() => setIsAnimated(true)}
					title='Press'
					alignSelfCenter
				/>
			</View>
		</FullScreenContainer>
	);
};
