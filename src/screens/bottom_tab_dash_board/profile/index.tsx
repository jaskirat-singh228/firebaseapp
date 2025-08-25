import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import BaseText from 'components/base_components/base_text';
import AnimatedLoaderButton from 'components/molecules/animated_loader_button';
import { useDialog } from 'context/app_dialog_provider';
import React from 'react';

import { StyleSheet, View } from 'react-native';
import { MaterialBottomTabScreenProps, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { BottomTabNavigatorParamList } from 'types/navigation_types';
import { vs } from 'utilities/scale_utils';
import { logoutUser, showToast } from 'utilities/utils';

type ProfileScreenProps = MaterialBottomTabScreenProps<
	BottomTabNavigatorParamList,
	'ProfileScreen'
>;

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
	const theme = useTheme();
	const { showDialog, hideDialog } = useDialog();
	const dispatch = useDispatch();

	const userData = useSelector((state: RootState) => state.loginData.loginData);

	const handleLogoutClick = React.useCallback(() => {
		showDialog({
			message: 'Do you want to logout?',
			title: 'Logout',
			actionType: 'error',
			isConfirmDestructive: true,
			onConfirm: async () => {
				try {
					await auth().signOut();
					await GoogleSignin.signOut();
					logoutUser(dispatch);
					showToast('User logged out successfully!', 'success');
				} catch (error) {
					console.error('Firebase sign out error:', error);
					showToast('Failed to logout. Try again.', 'error');
				} finally {
					hideDialog();
				}
			},
			onDismiss: hideDialog,
		});
	}, []);

	return (
		<View style={style.container}>
			<BaseText
				style={theme.fonts.displayMedium}
			>{`Email: ${userData?.userEmail ?? ''}`}</BaseText>
			<AnimatedLoaderButton isLoading={false} title={'Logout'} onPress={handleLogoutClick} />
		</View>
	);
};
export default ProfileScreen;

const style = StyleSheet.create({
	container: {
		flex: 1,
		gap: vs(10),
		alignItems: 'center',
		justifyContent: 'center',
	},
});
