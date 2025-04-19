import { LoadingSpinner } from "@/components/primitives";
import { sessionQuery } from "@/store/react-query/queryFactory";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";

function ProtectionLayout() {
	const navigate = useNavigate();

	const sessionQueryResult = useQuery(sessionQuery());

	useEffect(() => {
		if (!sessionQueryResult.data) {
			toast.error("You are not logged in");
			void navigate("/auth/signin");
		}
	}, [navigate, sessionQueryResult.data]);

	if (sessionQueryResult.isPending) {
		return <LoadingSpinner />;
	}

	return <Outlet />;
}
export default ProtectionLayout;
