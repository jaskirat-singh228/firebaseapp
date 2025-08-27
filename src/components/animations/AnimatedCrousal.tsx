import FullScreenContainer from 'components/hoc/full_screen_container';
import { AnimatedCrousalItem } from 'components/list_items/AnimatedCrousalItem';
import { BackWithTitleHeader } from 'components/molecules/back_with_title_view';
import React from 'react';
import { FlatList, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { ms } from 'react-native-size-matters';

export type TCrousal = {
	id: number;
	url: string;
	type: string;
};

const AnimatedCrousal = () => {
	const theme = useTheme();
	const onViewRef = React.useRef(({ viewableItems }: any) => {
		if (viewableItems.length > 0) {
			setCurrentIndex(viewableItems[0].index);
		}
	});
	const [currentIndex, setCurrentIndex] = React.useState<number>(0);

	const list = [
		{
			id: 1,
			url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
			type: 'Audio',
		},
		{
			id: 2,
			url: 'https://www.w3schools.com/html/mov_bbb.mp4',
			type: 'Video',
		},
		{
			id: 3,
			url: 'https://www.w3schools.com/w3images/lights.jpg',
			type: 'Image',
		},
	];

	return (
		<FullScreenContainer>
			<BackWithTitleHeader title='Animated Crousal' />
			<View>
				<FlatList
					data={list}
					contentContainerStyle={{
						justifyContent: 'center',
						paddingVertical: ms(40),
					}}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					keyExtractor={(item) => item?.id.toString()}
					onViewableItemsChanged={onViewRef.current}
					renderItem={({ item, index }) => (
						<AnimatedCrousalItem
							item={item}
							index={index}
							theme={theme}
							activeIndex={currentIndex}
						/>
					)}
				/>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
					}}
				>
					{list.map((item: TCrousal, index: number) => (
						<View
							key={item.id}
							style={{
								height: currentIndex === index ? ms(20) : ms(10),
								width: currentIndex === index ? ms(20) : ms(10),
								backgroundColor:
									currentIndex === index
										? theme.colors.primary
										: theme.colors.textInput.placeholder,
								marginHorizontal: ms(5),
								borderRadius: theme.radius.circle,
								marginTop: currentIndex === index ? ms(0) : ms(5),
							}}
						/>
					))}
				</View>
			</View>
		</FullScreenContainer>
	);
};

export default AnimatedCrousal;
