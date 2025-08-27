import BaseText from 'components/base_components/base_text';
import FullScreenContainer from 'components/hoc/full_screen_container';
import { BackWithTitleHeader } from 'components/molecules/back_with_title_view';
import React from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import Animated, {
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { SCREEN_WIDTH } from 'utilities/constants';
import { globalStyle } from 'utilities/global_styles';
import { ms } from 'utilities/scale_utils';

const TRACK_WIDTH = SCREEN_WIDTH * 0.9;
const POINT_SIZE = ms(40);

export const AnimatedRangeBar = () => {
	const theme = useTheme();
	const progress = useSharedValue(0);

	const animatedBarStyle = useAnimatedStyle(() => ({
		width: interpolate(progress.value, [0, 1], [0, TRACK_WIDTH]),
		backgroundColor: interpolateColor(
			progress.value,
			[0, 1],
			[theme.colors.primary, theme.colors.primary],
		),
		borderTopRightRadius: progress.value >= 0.95 ? theme.radius.circle : 0,
		borderBottomRightRadius: progress.value >= 0.95 ? theme.radius.circle : 0,
	}));

	const animatedPointerStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: interpolate(progress.value, [0, 1], [0, TRACK_WIDTH - 20]),
			},
		],
	}));

	const panGesture = Gesture.Pan().onUpdate((e) => {
		const newX = e.x;
		const localX = Math.max(0, Math.min(newX, TRACK_WIDTH));
		const newProgress = localX / TRACK_WIDTH;
		progress.value = withTiming(newProgress, { duration: 0 });
	});

	return (
		<FullScreenContainer>
			<BackWithTitleHeader title='Animated Range Bar' />
			<View
				style={[
					globalStyle.screenContainer,
					{ alignItems: 'center', justifyContent: 'center', gap: ms(20) },
				]}
			>
				<BaseText style={theme.fonts.displayLarge}>Scroll the Boll</BaseText>
				<GestureDetector gesture={panGesture}>
					<View
						style={{
							width: TRACK_WIDTH,
							height: ms(20),
							borderRadius: theme.radius.circle,
							backgroundColor: theme.colors.backdrop,
							justifyContent: 'center',
						}}
					>
						<Animated.View
							style={[
								{
									height: '100%',
									position: 'absolute',
									left: 0,
									top: 0,
									borderTopLeftRadius: theme.radius.circle,
									borderBottomLeftRadius: theme.radius.circle,
								},
								animatedBarStyle,
							]}
						/>
						<Animated.View
							style={[
								{
									position: 'absolute',
									height: POINT_SIZE,
									width: POINT_SIZE,
									backgroundColor: theme.colors.primary,
									borderRadius: theme.radius.circle,
									zIndex: 10,
								},
								animatedPointerStyle,
							]}
						/>
					</View>
				</GestureDetector>
			</View>
		</FullScreenContainer>
	);
};
