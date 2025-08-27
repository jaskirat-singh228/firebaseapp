import FullScreenContainer from 'components/hoc/full_screen_container';
import AnimatedLoaderButton from 'components/molecules/animated_loader_button';
import { BackWithTitleHeader } from 'components/molecules/back_with_title_view';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import React, { useState } from 'react';
import { View } from 'react-native';
import { globalStyle } from 'utilities/global_styles';
import { ms } from 'utilities/scale_utils';

export const FadeAnimation = () => {
	const fadeAnimation = useSharedValue(0);
	const [animated, setAnimated] = useState(false);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: fadeAnimation.value,
	}));

	React.useEffect(() => {
		if (animated) {
			fadeAnimation.value = withTiming(1, { duration: 1000 });
		} else {
			fadeAnimation.set(0);
		}
	}, [animated]);

	return (
		<FullScreenContainer>
			<BackWithTitleHeader title='Fade Animation' />
			<View
				style={[
					globalStyle.screenContainer,
					{ alignItems: 'center', justifyContent: 'center', gap: ms(20) },
				]}
			>
				<Animated.View
					style={[{ backgroundColor: 'red', height: 200, width: 200 }, animatedStyle]}
				/>
				<AnimatedLoaderButton onPress={() => setAnimated((prev) => !prev)} title='Press' />
			</View>
		</FullScreenContainer>
	);
};
