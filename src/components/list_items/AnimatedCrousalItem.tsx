import BaseText from 'components/base_components/base_text';
import React from 'react';
import { Pressable, View } from 'react-native';
import { MD3CustomTheme } from 'react-native-paper';
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'utilities/constants';

export const AnimatedCrousalItem = ({
	item,
	index,
	theme,
	activeIndex,
}: {
	item: number;
	index: number;
	theme: MD3CustomTheme;
	activeIndex: number;
}) => {
	const rotation = useSharedValue(0);
	const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

	React.useEffect(() => {
		if (activeIndex !== index) {
			rotation.value = withTiming(0, { duration: 500 });
		}
	}, [activeIndex]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotateY: `${rotation.value}deg` }],
		};
	});

	const frontStyle = useAnimatedStyle(() => {
		const opacity = interpolate(rotation.value, [0, 90], [1, 0], Extrapolation.CLAMP);
		return { opacity };
	});

	const backStyle = useAnimatedStyle(() => {
		const opacity = interpolate(rotation.value, [90, 180], [0, 1], Extrapolation.CLAMP);
		return { opacity, transform: [{ rotateY: '180deg' }] };
	});

	const handlePress = () => {
		rotation.value = withTiming(rotation.value === 0 ? 180 : 0, { duration: 500 });
	};

	return (
		<View style={{ width: SCREEN_WIDTH, alignItems: 'center' }}>
			<AnimatedPressable
				onPress={handlePress}
				style={[
					{
						height: SCREEN_HEIGHT * 0.5,
						width: SCREEN_WIDTH * 0.8,
						borderRadius: theme.radius.large,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: theme.colors.primary,
					},
					animatedStyle,
				]}
			>
				<Animated.View
					style={[
						frontStyle,
						{
							position: 'absolute',
						},
					]}
				>
					<BaseText
						style={[theme.fonts.displayLarge, { color: theme.colors.textColor.white }]}
					>{`Front ${item}`}</BaseText>
				</Animated.View>
				<Animated.View
					style={[
						backStyle,
						{
							position: 'absolute',
							height: '100%',
							width: '100%',
							backgroundColor: 'red',
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: theme.radius.large,
						},
					]}
				>
					<BaseText
						style={[theme.fonts.displayLarge, { color: theme.colors.textColor.white }]}
					>{`Back ${item}`}</BaseText>
				</Animated.View>
			</AnimatedPressable>
		</View>
	);
};
