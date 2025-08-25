import { configureStore } from '@reduxjs/toolkit';
import appDataReducer from 'store/slices/app_data_slice';
import loginReducer from 'store/slices/login_slice';

// export const loggerMiddleware: Middleware = (store) => (next) => (action) => {
//
// 	const result = next(action);
// 	);
// 	return result;
// };

export const store = configureStore({
	reducer: {
		loginData: loginReducer,
		appData: appDataReducer,
	},
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
