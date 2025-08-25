import FullScreenContainer from 'components/hoc/full_screen_container';
import AnimatedLoaderButton from 'components/molecules/animated_loader_button';
import { BackWithTitleHeader } from 'components/molecules/back_with_title_view';
import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, {
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { SCREEN_WIDTH } from 'utilities/constants';
import { ms } from 'utilities/scale_utils';

const NUMBER_OF_BARS = 4;
const DURATION = 3000;
const BAR_WIDTH = (SCREEN_WIDTH - ms(8) * (NUMBER_OF_BARS - 2)) / NUMBER_OF_BARS;

export const ProgressBar = () => {
	const theme = useTheme();
	const [currentIndex, setCurrentIndex] = React.useState<number>(0);
	const progresses = Array.from({ length: NUMBER_OF_BARS }, () => useSharedValue(0));

	console.log(
		'Progress ==> ',
		progresses.map((item) => item.value),
	);

	const animateIndex = (index: number) => {
		if (index < 0) return;
		if (currentIndex === 0) {
			progresses[currentIndex].value = withTiming(1, {
				duration: DURATION,
			});
		}
		progresses[index].value = withTiming(1, { duration: DURATION }, (complete) => {
			if (complete) {
				runOnJS(setCurrentIndex)(index === NUMBER_OF_BARS - 1 ? index : index + 1);
			}
		});
	};

	const resetAll = () => {
		progresses.forEach((p) => (p.value = 0));
		setCurrentIndex(0);
		animateIndex(0);
	};

	React.useEffect(() => {
		animateIndex(currentIndex);
	}, [currentIndex, progresses]);

	return (
		<FullScreenContainer>
			<BackWithTitleHeader title='Progress Bar' />
			<View style={{ flexDirection: 'row' }}>
				{Array.from({ length: NUMBER_OF_BARS }).map((_, index) => {
					const animatedStyle = useAnimatedStyle(() => ({
						width: interpolate(
							progresses[index].value,
							[0, 1],
							[0, BAR_WIDTH],
							'clamp',
						),
						borderTopRightRadius:
							progresses[index].value >= 0.95 ? theme.radius.circle : 0,
						borderBottomRightRadius:
							progresses[index].value >= 0.95 ? theme.radius.circle : 0,
					}));
					return (
						<Animated.View
							key={index}
							style={{
								backgroundColor: theme.colors.backdrop,
								height: ms(10),
								marginHorizontal: ms(2),
								marginVertical: ms(20),
								borderRadius: theme.radius.circle,
								width: BAR_WIDTH,
							}}
						>
							<Animated.View
								style={[
									{
										position: 'absolute',
										top: 0,
										backgroundColor: 'red',
										height: ms(10),
										borderTopLeftRadius: theme.radius.circle,
										borderBottomLeftRadius: theme.radius.circle,
									},
									animatedStyle,
								]}
							/>
						</Animated.View>
					);
				})}
			</View>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					width: SCREEN_WIDTH,
					padding: ms(15),
				}}
			>
				<AnimatedLoaderButton
					width={SCREEN_WIDTH * 0.2}
					onPress={() => {
						progresses.forEach((item, index) => {
							if (currentIndex < index) {
								item.value = 0;
							} else {
								if (currentIndex > 0) {
									const prev = currentIndex - 1;
									progresses[currentIndex].value = withTiming(
										0,
										{
											duration: 0,
										},
										(completed) => {
											if (completed) {
												progresses[prev].value = withTiming(
													0,
													{ duration: 0 },
													(completed) => {
														if (completed)
															runOnJS(setCurrentIndex)(prev);
													},
												);
											}
										},
									);
								}
							}
						});
					}}
					title='Prev'
				/>
				<AnimatedLoaderButton
					width={SCREEN_WIDTH * 0.4}
					onPress={resetAll}
					title='Restart'
				/>
				<AnimatedLoaderButton
					width={SCREEN_WIDTH * 0.2}
					onPress={() => {
						progresses.forEach((item, index) => {
							if (currentIndex > index - 1) {
								item.value = 1;
							}
						});
						if (currentIndex < NUMBER_OF_BARS - 1) {
							const next = currentIndex + 1;
							progresses[next].value = withTiming(1, { duration: DURATION });
							setCurrentIndex(next);
						}
					}}
					title='Next'
				/>
			</View>
		</FullScreenContainer>
	);
};
