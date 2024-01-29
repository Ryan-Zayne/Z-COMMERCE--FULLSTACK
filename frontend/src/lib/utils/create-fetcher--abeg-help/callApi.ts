import { assertENV } from "@/lib/type-helpers/global-type-helpers";
import { createFetcher } from "./create-fetcher";

const callApi = createFetcher({
	baseURL: assertENV(process.env.NEXT_PUBLIC_BACKEND_URL, {
		message: "Please add the NEXT_PUBLIC_BACKEND_URL variable to your .env file",
	}),
	timeout: 60000, // Set timeout to 60 seconds

	onResponseError: (response) => {
		if (response.status === 401) {
			useSession.getState().clearSession();
		}
	},
});

export { callApi };
