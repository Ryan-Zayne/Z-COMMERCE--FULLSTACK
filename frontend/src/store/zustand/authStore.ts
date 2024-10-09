import { create } from "zustand";

// Store Object creation

// Store hook Creation
export const useAuthStore = create(() => ({
	authActions: {
		getFoo: () => {},
	},

	isAuth: false,
}));

// Actions hook
