import FullScreenContainer from 'components/hoc/full_screen_container';
import AnimatedLoaderButton from 'components/molecules/animated_loader_button';
import { BackWithTitleHeader } from 'components/molecules/back_with_title_view';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import React, { useState } from 'react';
import { View } from 'react-native';
import { SCREEN_WIDTH } from 'utilities/constants';
import { globalStyle } from 'utilities/global_styles';

export const SlideAnimation = () => {
	const slideAnim = useSharedValue(0);
	const [animated, setAnimated] = useState(false);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: slideAnim.value }],
	}));

	React.useEffect(() => {
		if (animated) {
			slideAnim.value = withTiming(SCREEN_WIDTH - 200, { duration: 1000 });
		} else {
			slideAnim.set(0);
		}
	}, [animated]);

	return (
		<FullScreenContainer>
			<BackWithTitleHeader title='Slide Animation' />
			<View style={globalStyle.screenContainer}>
				<Animated.View
					style={[
						{
							backgroundColor: 'red',
							height: 200,
							width: 200,
							alignSelf: 'flex-start',
						},
						animatedStyle,
					]}
				/>
				<AnimatedLoaderButton onPress={() => setAnimated((prev) => !prev)} title='Press' />
			</View>
		</FullScreenContainer>
	);
};
