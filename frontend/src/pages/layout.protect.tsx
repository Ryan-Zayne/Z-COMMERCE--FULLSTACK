import { LoadingSpinner } from "@/components/primitives";
import { sessionQuery } from "@/store/react-query/queryFactory";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";

function ProtectionLayout() {
	const { data, isError } = useQuery(sessionQuery());

	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			toast.error("You are not logged in! Redirecting to sign in page...", { duration: 2000 });
			void navigate("/auth/signin");
		}
	}, [isError, navigate]);

	if (data) {
		return <Outlet />;
	}

	return <LoadingSpinner />;
}
export default ProtectionLayout;
