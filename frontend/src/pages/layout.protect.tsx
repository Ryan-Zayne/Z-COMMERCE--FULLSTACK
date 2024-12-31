import { LoadingSpinner } from "@/components/primitives";
import { sessionQuery } from "@/store/react-query/queryFactory";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate } from "react-router";

function ProtectionLayout() {
	const navigate = useNavigate();

	const { data } = useQuery(
		sessionQuery({
			meta: {
				redirectOn404Error: { navigateFn: navigate },
			},
		})
	);

	if (data) {
		return <Outlet />;
	}

	return <LoadingSpinner />;
}
export default ProtectionLayout;
