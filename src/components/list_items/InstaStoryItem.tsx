import { TUrlVideoItem } from 'components/animations/AnimatedCrousal';
import BaseImageView from 'components/base_components/base_image_view';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { runOnJS } from 'react-native-reanimated';
import Video, { VideoRef } from 'react-native-video';
import { CARD_HEIGHT, CARD_WIDTH } from './AnimatedCrousalItem';

const InstaStoryItem = ({
	item,
	index,
	setDuration,
	currentIndex,
	setCurrentIndex,
}: {
	item: TUrlVideoItem;
	index: number;
	setDuration: React.Dispatch<React.SetStateAction<number>>;
	currentIndex: number;
	setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const theme = useTheme();
	const videoPlayerRef = React.useRef<VideoRef>(null);

	React.useEffect(() => {
		// Pause & reset when not the active story
		if (currentIndex !== index && videoPlayerRef?.current) {
			videoPlayerRef.current.seek?.(0);
		}
	}, [currentIndex]);

	const renderVideo = () => (
		<Video
			ref={videoPlayerRef}
			style={{
				height: CARD_HEIGHT,
				width: CARD_WIDTH,
				borderRadius: theme.radius.large,
				overflow: 'hidden',
			}}
			source={{ uri: item.url }}
			resizeMode='cover'
			repeat={false}
			controls={false}
			paused={currentIndex !== index}
			muted={false}
			volume={1.0}
			onLoad={(data) => {
				setDuration(data.duration * 1000);
			}}
			onEnd={() => {
				runOnJS(setCurrentIndex)(currentIndex + 1);
			}}
		/>
	);

	if (item.type === 'Audio' || item.type === 'Video') {
		return renderVideo();
	}

	if (item.type === 'Image') {
		return (
			<BaseImageView
				key={item.id}
				height={CARD_HEIGHT}
				width={CARD_WIDTH}
				borderRadius={theme.radius.large}
				source={{ uri: item.url }}
				containImage={false}
			/>
		);
	}

	return null;
};

export default InstaStoryItem;
