import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Store Object creation

// Store hook Creation
export const useAuthStore = create((get, set) => ({
	isAuth: false,

	authActions: {
		getFoo: () => {},
	},
}));

// Actions hook
