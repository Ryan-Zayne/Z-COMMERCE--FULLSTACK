import { sessionQuery } from "@/store/react-query/queryFactory";
import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";

function VerifyEmailLayout() {
	const navigate = useNavigate();

	const sessionQueryResult = useQuery(sessionQuery());

	useLayoutEffect(() => {
		if (sessionQueryResult.data?.user.isEmailVerified) {
			toast.success("Your email has already been verified");
			void navigate("/auth/verify-email/success");
		}
	}, [navigate, sessionQueryResult.data?.user.isEmailVerified]);

	return <Outlet />;
}

export default VerifyEmailLayout;
