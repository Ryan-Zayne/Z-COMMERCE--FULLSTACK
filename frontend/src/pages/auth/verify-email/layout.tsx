import { sessionQuery } from "@/store/react-query/queryFactory";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate } from "react-router";

function VerifyEmailLayout() {
	const navigate = useNavigate();

	useQuery(
		sessionQuery({
			onSuccess: ({ data }) => {
				if (data.data?.user.isEmailVerified) {
					void navigate("/auth/verify-email/success");
				}
			},
		})
	);

	return <Outlet />;
}

export default VerifyEmailLayout;
