import { assertENV } from "@/lib/type-helpers/assert";
import { toast } from "react-hot-toast";
import { createFetcher } from "./create-fetcher";

const BACKEND_API = assertENV(process.env.NEXT_PUBLIC_BACKEND_URL, {
	message: "Please add the NEXT_PUBLIC_BACKEND_API variable to your .env file",
});

// Pretend Session store
const useInitSession = {
	getState: () => {
		return {
			actions: {
				clearSession: () => {},
			},
		};
	},
};

const callAbegApi = createFetcher({
	baseURL: BACKEND_API,
	timeout: 60000, // Set timeout to 60 seconds
	credentials: "include",

	onResponseError: (error) => {
		if (error.status === 401) {
			useInitSession.getState().actions.clearSession();
		}

		if (error.status === 429) {
			toast.error(error.response.message);
		}
	},
});

export { callAbegApi };
