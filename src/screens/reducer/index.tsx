import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BaseText from 'components/base_components/base_text';
import FullScreenContainer from 'components/hoc/full_screen_container';
import { BackWithTitleHeader } from 'components/molecules/back_with_title_view';
import React, { useReducer } from 'react';
import { Button, View } from 'react-native';
import { AppStackParamList } from 'types/navigation_types';
import { ms } from 'utilities/scale_utils';

type ReducerScreenProps = NativeStackScreenProps<AppStackParamList, 'ReducerScreen'>;

// type userData = {
// 	name: string;
// 	age: number;
// 	mobile: number;
// 	address: {
// 		addressline: string;
// 		city: string;
// 		state: string;
// 		country: string;
// 	};
// };

// // write which are not required
// const other: Omit<userData, 'name' | 'address'> = {
// 	age: 20,
// 	mobile: 1234567890,
// };

// // make optional type
// const request: Partial<userData> = {
// 	name: 'hgsfkdcfj',
// };

type Data = {
	count: number;
};

type Action = {
	type: string;
};

const initialState: Data = {
	count: 0,
};

const reducer = (state: Data, action: Action) => {
	switch (action.type) {
		case 'increment':
			return { count: state.count + 1 };
		case 'decrement':
			return { count: state.count - 1 };
		case 'reset':
			return { count: 0 };
		default:
			return state;
	}
};

const ReducerScreen: React.FC<ReducerScreenProps> = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<FullScreenContainer>
			<BackWithTitleHeader title='Reducer' />
			<View style={{ justifyContent: 'center', gap: ms(20) }}>
				<BaseText style={{ alignSelf: 'center' }}>Count: {state.count}</BaseText>
				<Button title='add' onPress={() => dispatch({ type: 'increment' })} />
				<Button title='remove' onPress={() => dispatch({ type: 'decrement' })} />
				<Button title='reset' onPress={() => dispatch({ type: 'reset' })} />
			</View>
		</FullScreenContainer>
	);
};

export default ReducerScreen;
