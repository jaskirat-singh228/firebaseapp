import { RouteProp, useRoute } from '@react-navigation/native';
import AnimatedCrousal from 'components/animations/AnimatedCrousal';
import { AnimatedRangeBar } from 'components/animations/AnimatedRangeBar';
import { AnimatedScrollHeader } from 'components/animations/AnimatedScrollHeader';
import { DragBox } from 'components/animations/DragBox';
import { FadeAnimation } from 'components/animations/FadeAnimation';
import { InstagramStoryProgress } from 'components/animations/InstagramStoryProgress';
import { InterPolateAnimation } from 'components/animations/InterPolateAnimation';
import { PopUpAnimation } from 'components/animations/PopUpAnimation';
import { RepeatAndSequence } from 'components/animations/RepeatAndSequence';
import { SlideAnimation } from 'components/animations/SlideAnimation';
import BaseText from 'components/base_components/base_text';
import React from 'react';
import { AppStackParamList } from 'types/navigation_types';

type AnimationDemoRouteProp = RouteProp<AppStackParamList, 'AnimationDemoScreen'>;

const AnimationDemoScreen: React.FC = () => {
	const { params } = useRoute<AnimationDemoRouteProp>();

	const renderContent = () => {
		switch (params?.animationType) {
			case 'interpolate':
				return <InterPolateAnimation />;
			case 'fade':
				return <FadeAnimation />;
			case 'slide':
				return <SlideAnimation />;
			case 'scroll_header':
				return <AnimatedScrollHeader />;
			case 'range_bar':
				return <AnimatedRangeBar />;
			case 'repeat_&_sequence':
				return <RepeatAndSequence />;
			case 'pop_up':
				return <PopUpAnimation />;
			case 'drag_box':
				return <DragBox />;
			case 'progress_bar':
				return <InstagramStoryProgress />;
			case 'animated_crousal':
				return <AnimatedCrousal />;
			default:
				return <BaseText>No animation here!</BaseText>;
		}
	};

	return renderContent();
};

export default AnimationDemoScreen;
