import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BaseText from 'components/base_components/base_text';
import CardView from 'components/hoc/card_view';
import FullScreenContainer from 'components/hoc/full_screen_container';
import { BackWithTitleHeader } from 'components/molecules/back_with_title_view';
import React from 'react';
import { FlatList, PermissionsAndroid, View } from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';
import { AppStackParamList } from 'types/navigation_types';
import { IS_ANDROID } from 'utilities/constants';
import { ms } from 'utilities/scale_utils';

type ContactScreenProps = NativeStackScreenProps<AppStackParamList, 'ContactScreen'>;

const ContactScreen: React.FC<ContactScreenProps> = () => {
	const [contacts, setContacts] = React.useState<Contact[]>([]);

	const getContacts = async () => {
		try {
			if (IS_ANDROID) {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
					{
						title: 'Contacts Permission',
						message: 'This app would like to view your contacts.',
						buttonPositive: 'Please accept',
					},
				);

				if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
					return;
				}
			}

			const allContacts = await Contacts.getAll();
			setContacts(allContacts);
		} catch (error) {
			console.error('Error fetching contacts', error);
		}
	};

	React.useEffect(() => {
		getContacts();
	}, []);

	return (
		<FullScreenContainer>
			<BackWithTitleHeader title='Contacts' />
			<FlatList
				data={contacts}
				contentContainerStyle={{
					paddingHorizontal: ms(15),
					paddingBottom: ms(100),
				}}
				style={{ paddingTop: ms(10), marginTop: ms(10) }}
				keyExtractor={(item: Contact) => item.recordID.toString()}
				renderItem={({ item }: { item: Contact }) => {
					return (
						<CardView
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<BaseText
								numberOfLines={2}
								style={{ fontSize: 16, padding: ms(10), width: '40%' }}
							>
								{item.givenName}
							</BaseText>
							<View style={{ flex: 1 }}>
								{item.phoneNumbers.map((p, i) => (
									<BaseText
										style={{
											fontSize: 16,
											width: '100%',
										}}
										key={i}
									>{`${p?.label}: ${p?.number}`}</BaseText>
								))}
							</View>
						</CardView>
					);
				}}
			/>
		</FullScreenContainer>
	);
};

export default ContactScreen;
