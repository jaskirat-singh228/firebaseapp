import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetModalProvider,
	BottomSheetTextInput,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { RefObject } from 'react';
import { BackHandler } from 'react-native';
import { useTheme } from 'react-native-paper';

type ChatSheetProps = {
	reff: RefObject<BottomSheet | null>;
};

const ChatSheet: React.FC<ChatSheetProps> = (props) => {
	const { reff } = props;
	const theme = useTheme();
	const [value, setValue] = React.useState<string>('');
	// variables
	const snapPoints = React.useMemo(() => ['80%'], []);
	const [currentIndex, setCurrentIndex] = React.useState<number>(-1);

	const onBackPress = () => {
		if (reff !== null) {
			reff.current?.close();
			return true;
		}
	};

	React.useEffect(() => {
		if (currentIndex !== -1) {
			const handler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

			return () => {
				handler.remove();
			};
		}
	}, [currentIndex]);

	return (
		<BottomSheetModalProvider>
			<BottomSheet
				ref={reff}
				snapPoints={snapPoints}
				index={-1}
				onChange={setCurrentIndex}
				keyboardBehavior={'extend'}
				animateOnMount
				backdropComponent={(props) => (
					<BottomSheetBackdrop
						{...props}
						disappearsOnIndex={-1}
						appearsOnIndex={0}
						onPress={() => reff?.current?.collapse()}
					/>
				)}
				enablePanDownToClose
			>
				<BottomSheetView
					style={{
						flex: 1,
						alignItems: 'center',
					}}
				>
					<BottomSheetTextInput
						value={value}
						style={{
							alignSelf: 'stretch',
							marginHorizontal: 12,
							marginBottom: 12,
							padding: 12,
							borderRadius: 12,
							backgroundColor: theme.colors.backdrop,
							color: 'white',
							textAlign: 'center',
						}}
						onChangeText={setValue}
					/>
				</BottomSheetView>
			</BottomSheet>
		</BottomSheetModalProvider>
	);
};

const ChatBottomSheet = React.memo(ChatSheet);
export default ChatBottomSheet;
