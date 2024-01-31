import { assertENV } from "@/lib/type-helpers/global-type-helpers";
import { createFetcher } from "./create-fetcher";

const useSession = {}; // Pretend this is a zustand custom hook for session management

const callApi = createFetcher({
	baseURL: assertENV(process.env.NEXT_PUBLIC_BACKEND_URL, {
		message: "Please add the NEXT_PUBLIC_BACKEND_URL variable to your .env file",
	}),
	timeout: 60000, // Set timeout to 60 seconds

	onResponseError: (response) => {
		if (response.status === 401) {
			// @ts-expect-error - This is a zustand custom hook psuedo code
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
			useSession.getState?.()?.clearSession?.();
		}
	},
});

export { callApi };
