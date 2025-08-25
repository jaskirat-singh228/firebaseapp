import FullScreenContainer from 'components/hoc/full_screen_container';
import AnimatedLoaderButton from 'components/molecules/animated_loader_button';
import { BackWithTitleHeader } from 'components/molecules/back_with_title_view';
import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { globalStyle } from 'utilities/global_styles';
import { ms } from 'utilities/scale_utils';

const BOX_SIZE = ms(200);

export const PopUpAnimation = () => {
	const offSet = useSharedValue(0);
	const [isAnimated, setIsAnimated] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (isAnimated) {
			offSet.value = withSpring(1, { damping: 11 });
		} else {
			offSet.set(0);
		}
	}, [isAnimated]);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: offSet.value,
		transform: [{ scale: offSet.value }],
	}));

	return (
		<FullScreenContainer>
			<BackWithTitleHeader title='Pop-Up Animation' />
			<View style={globalStyle.screenContainer}>
				<Animated.View
					style={[
						{ height: BOX_SIZE, width: BOX_SIZE, backgroundColor: 'red' },
						animatedStyle,
					]}
				/>
				<AnimatedLoaderButton
					onPress={() => {
						setIsAnimated(!isAnimated);
					}}
					title='Press'
				/>
			</View>
		</FullScreenContainer>
	);
};
