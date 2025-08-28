import { TUrlVideoItem } from 'components/animations/AnimatedCrousal';
import BaseImageView from 'components/base_components/base_image_view';
import BaseText from 'components/base_components/base_text';
import React from 'react';
import { Pressable, View } from 'react-native';
import { Icon, MD3CustomTheme } from 'react-native-paper';
import Animated, {
	Extrapolation,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { ms } from 'react-native-size-matters';
import Video, { VideoRef } from 'react-native-video';
import { MaterialIcon, SCREEN_HEIGHT, SCREEN_WIDTH } from 'utilities/constants';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const CARD_HEIGHT = SCREEN_HEIGHT * 0.5;
export const CARD_WIDTH = SCREEN_WIDTH * 0.8;

export const AnimatedCrousalItem = ({
	item,
	index,
	theme,
	activeIndex,
}: {
	item: TUrlVideoItem;
	index: number;
	theme: MD3CustomTheme;
	activeIndex: number;
}) => {
	const [isFront, setIsFront] = React.useState(true);
	const videoPlayerRef = React.useRef<VideoRef>(null);
	const rotation = useSharedValue(0);

	React.useEffect(() => {
		if (activeIndex !== index) {
			rotation.value = withTiming(0, { duration: 500 });
			setIsFront(true);
			if (videoPlayerRef?.current) {
				videoPlayerRef.current.pause?.();
				videoPlayerRef.current.seek?.(0);
			}
		}
	}, [activeIndex]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotateY: `${rotation.value}deg` }],
		};
	});
	const frontStyle = useAnimatedStyle(() => {
		const opacity = interpolate(rotation.value, [0, 90], [1, 0], Extrapolation.CLAMP);
		return {
			opacity,
			transform: [{ rotateY: '0deg' }],
		};
	});

	const backStyle = useAnimatedStyle(() => {
		const opacity = interpolate(rotation.value, [90, 180], [0, 1], Extrapolation.CLAMP);
		return {
			opacity,
			transform: [{ rotateY: '180deg' }],
		};
	});

	const handleFrontCardPress = () => {
		videoPlayerRef?.current?.pause();
		rotation.value = withTiming(180, { duration: 500 }, () => {
			runOnJS(setIsFront)(false);
		});
	};

	const pauseVideo = () => {
		videoPlayerRef?.current?.pause?.(); // safe call
		setIsFront(true);
	};

	const handleBackCardPress = () => {
		rotation.value = withTiming(0, { duration: 500 }, () => {
			runOnJS(pauseVideo)();
		});
	};

	return (
		<View style={{ width: SCREEN_WIDTH, alignItems: 'center' }}>
			<Animated.View
				style={[
					{
						height: CARD_HEIGHT,
						width: CARD_WIDTH,
						borderRadius: theme.radius.large,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: theme.colors.primary,
						overflow: 'hidden',
					},
					animatedStyle,
				]}
			>
				{/* Front Side */}
				<AnimatedPressable
					onPress={handleFrontCardPress}
					style={[
						frontStyle,
						{
							position: 'absolute',
							height: CARD_HEIGHT,
							width: CARD_WIDTH,
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: theme.radius.large,
						},
					]}
					pointerEvents={isFront ? 'auto' : 'none'} // 👈 only active when front
				>
					<BaseText
						style={[theme.fonts.displayLarge, { color: theme.colors.textColor.white }]}
					>
						{item.type}
					</BaseText>
				</AnimatedPressable>

				{/* Back Side */}
				<AnimatedPressable
					onPress={handleBackCardPress}
					style={[
						backStyle,
						{
							position: 'absolute',
							height: CARD_HEIGHT,
							width: CARD_WIDTH,
							alignItems: 'center',
							justifyContent: 'center',
							// backfaceVisibility: 'hidden',
						},
					]}
					pointerEvents={!isFront ? 'auto' : 'none'} // 👈 only active when front
				>
					<Pressable
						onPress={handleBackCardPress}
						style={{
							position: 'absolute',
							alignItems: 'center',
							zIndex: 100,
							top: 10,
							right: 10,
						}}
					>
						<Icon
							size={ms(40)}
							source={MaterialIcon.ORBIT_VARIENT}
							color={theme.colors.textColor.white}
						/>
					</Pressable>
					{item.type === 'Audio' ? (
						<View
							style={{
								height: CARD_HEIGHT,
								width: CARD_WIDTH,
								borderRadius: theme.radius.large,
							}}
						>
							<Video
								ref={videoPlayerRef}
								style={{
									height: CARD_HEIGHT,
									width: CARD_WIDTH,
									borderRadius: theme.radius.large,
								}}
								source={{ uri: item.url }}
								resizeMode='cover'
								repeat={false}
								controls
								paused={true}
								muted={false}
								volume={1.0}
								onEnd={() => videoPlayerRef?.current?.pause()}
							/>
						</View>
					) : item.type === 'Video' ? (
						<View
							style={{
								height: CARD_HEIGHT,
								width: CARD_WIDTH,
								borderRadius: theme.radius.large,
							}}
						>
							<Video
								ref={videoPlayerRef}
								style={{
									height: CARD_HEIGHT,
									width: CARD_WIDTH,
									borderRadius: theme.radius.large,
								}}
								source={{ uri: item.url }}
								resizeMode='cover'
								repeat={false}
								controls
								paused={true}
								muted={false}
								volume={1.0}
								onEnd={() => videoPlayerRef?.current?.pause()}
							/>
						</View>
					) : item.type === 'Image' ? (
						<BaseImageView
							height={CARD_HEIGHT}
							width={CARD_WIDTH}
							borderRadius={theme.radius.large}
							source={{ uri: item.url }}
						/>
					) : (
						<BaseImageView
							height={CARD_HEIGHT}
							width={CARD_WIDTH}
							borderRadius={theme.radius.large}
							source={{ uri: item.url }}
						/>
					)}
				</AnimatedPressable>
			</Animated.View>
		</View>
	);
};
