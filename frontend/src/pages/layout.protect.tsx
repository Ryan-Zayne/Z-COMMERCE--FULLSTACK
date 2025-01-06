import { LoadingSpinner } from "@/components/primitives";
import { sessionQuery } from "@/store/react-query/queryFactory";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";

function ProtectionLayout() {
	const navigate = useNavigate();

	const sessionQueryResult = useQuery(
		sessionQuery({
			meta: { redirectOn401Error: true },

			onRequestError: ({ error }) => {
				toast.error(error.message, { duration: 2000 });
				void navigate("/auth/signin");
			},
		})
	);

	if (sessionQueryResult.isPending) {
		return <LoadingSpinner />;
	}

	return <Outlet />;
}
export default ProtectionLayout;
