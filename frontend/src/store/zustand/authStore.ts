import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Store Object creation
const authStateObjectFn = () => ({
	isAuth: false,

	authActions: {},
});

// Store hook Creation
export const useAuthStore = create(
	devtools(authStateObjectFn, {
		store: 'authStore',
		anonymousActionType: 'unknownAction',
		enabled: import.meta.env.DEV,
	})
);

// Actions hook
export const useAuthActions = () => useAuthStore((state) => state.authActions);
