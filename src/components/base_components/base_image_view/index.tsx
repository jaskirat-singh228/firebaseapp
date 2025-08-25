import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';

type BaseImageProps = {
	source: ImageSourcePropType;
	height: number;
	width: number;
	borderRadius?: number;
	borderWidth?: number;
	borderColor?: string;
	topBorderOnly?: boolean;
	containImage?: boolean;
};

const BaseImage: React.FC<BaseImageProps> = (props) => {
	// const theme = useTheme();
	const {
		height,
		width,
		source,
		borderRadius = 0,
		topBorderOnly = false,
		borderWidth = 0,
		borderColor = 'transparent',
		containImage = false,
	} = props;

	return (
		<Image
			style={{
				width,
				height,
				padding: borderWidth ? width * 0.1 : 0,
				...(topBorderOnly
					? {
							borderTopLeftRadius: borderRadius,
							borderTopRightRadius: borderRadius,
						}
					: { borderRadius }),
				borderWidth,
				borderColor,
			}}
			source={source}
			resizeMethod={'resize'}
			resizeMode={containImage ? 'contain' : 'cover'}
		/>
	);
};

const BaseImageView = React.memo(BaseImage);
export default BaseImageView;
