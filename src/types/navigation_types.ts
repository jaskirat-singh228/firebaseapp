export type AppStackParamList = {
	DashBoardScreen: undefined;
	DashbordTopTabBarScreen: undefined;
	TodoScreen: {
		id?: string;
	};
	NativeModuleScreen: undefined;
	ReducerScreen: undefined;
	KeyBoardControllerScreen: undefined;
	AppWelcomeAnimationScreen: undefined;
	AnimationDemoScreen: {
		animationType:
			| 'interpolate'
			| 'fade'
			| 'slide'
			| 'scroll_header'
			| 'range_bar'
			| 'pop_up'
			| 'repeat_&_sequence'
			| 'drag_box'
			| 'progress_bar'
			| 'animated_crousal';
	};
	ContactScreen: undefined;
};

export type AuthenticationStackParamList = {
	LoginScreen: undefined;
	SignUpScreen: undefined;
	SplashScreen: undefined;
};

export type DashbordBottomTabBarParamList = {
	HomeScreen: undefined;
	ProfileScreen: undefined;
	SettingsScreen: undefined;
};

export type DashbordTopTabBarParamList = {
	TopTab1: undefined;
	TopTab2: undefined;
};
