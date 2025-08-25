import BaseText from 'components/base_components/base_text';
import FullScreenContainer from 'components/hoc/full_screen_container';
import { BackWithTitleHeader } from 'components/molecules/back_with_title_view';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import { SCREEN_HEIGHT } from 'utilities/constants';

const HEADER_HEIGHT = SCREEN_HEIGHT * 0.2;
const MIN_HEADER_HEIGHT = SCREEN_HEIGHT * 0.06;

export const AnimatedScrollHeader = () => {
	const theme = useTheme();
	const scrollY = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollY.value = event.contentOffset.y;
		},
	});

	const headerAnimatedStyle = useAnimatedStyle(() => ({
		height: interpolate(
			scrollY.value,
			[0, HEADER_HEIGHT - MIN_HEADER_HEIGHT],
			[HEADER_HEIGHT, MIN_HEADER_HEIGHT],
			Extrapolation.CLAMP,
		),
	}));

	return (
		<FullScreenContainer>
			<BackWithTitleHeader title='Animated Scroll Header' />
			<Animated.View
				style={[
					{
						alignItems: 'center',
						backgroundColor: '#6200EE',
						borderBottomLeftRadius: 20,
						borderBottomRightRadius: 20,
						justifyContent: 'center',
					},
					headerAnimatedStyle,
				]}
			>
				<BaseText style={{ fontSize: 18, color: theme.colors.textColor.white }}>
					Header
				</BaseText>
			</Animated.View>
			<Animated.ScrollView
				style={{
					flex: 1,
				}}
				contentContainerStyle={{ paddingBottom: HEADER_HEIGHT }}
				onScroll={scrollHandler}
				scrollEventThrottle={16}
			>
				{Array.from({ length: 20 }).map((_, index) => (
					<View
						key={index}
						style={{
							height: 80,
							borderBottomWidth: 1,
							borderBottomColor: '#ddd',
							justifyContent: 'center',
							paddingHorizontal: 20,
						}}
					>
						<BaseText style={{ fontSize: 18 }}>Item {index + 1}</BaseText>
					</View>
				))}
			</Animated.ScrollView>
		</FullScreenContainer>
	);
};
