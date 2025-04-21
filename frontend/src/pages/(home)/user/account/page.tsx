import { Button } from "@/components/primitives/button";
import { sessionQuery } from "@/store/react-query/queryFactory";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

function UserAccountPage() {
	const sessionQueryResult = useQuery(sessionQuery());

	if (!sessionQueryResult.data?.user) {
		throw new Error("User not found");
	}

	return (
		<main className="mx-auto max-w-[120rem] px-[1.6rem] py-[2rem] md:px-[4rem] md:py-[3rem]">
			<header className="flex items-center justify-between border-b pb-[1.6rem] md:pb-[2rem]">
				<h1 className="text-[2.4rem] font-[700] md:text-[3.2rem]">My Account</h1>
			</header>

			<section className="mt-[2rem] grid gap-[2rem] md:mt-[4rem] md:grid-cols-2 md:gap-[4rem]">
				{/* Profile Information */}
				<div className="rounded-lg bg-gray-50 p-[1.6rem] dark:bg-gray-800 md:p-[2rem]">
					<h2 className="mb-[1.6rem] text-[1.8rem] font-medium md:mb-[2rem] md:text-[2rem]">
						Profile Information
					</h2>

					<div className="flex flex-col gap-[1.2rem] text-[1.4rem] md:gap-[1.6rem] md:text-[1.6rem]">
						<div>
							<span className="font-medium">Username:</span>
							<p className="mt-[0.4rem] text-gray-600 dark:text-gray-400">
								{sessionQueryResult.data.user.username}
							</p>
						</div>

						<div>
							<span className="font-medium">Email:</span>
							<p className="mt-[0.4rem] text-gray-600 dark:text-gray-400">
								{sessionQueryResult.data.user.email}
							</p>
						</div>

						<div>
							<span className="font-medium">Email Verified:</span>
							<p className="mt-[0.4rem] text-gray-600 dark:text-gray-400">
								{sessionQueryResult.data.user.isEmailVerified ? "Yes" : "No"}
							</p>
						</div>
					</div>

					<Button
						theme="primary"
						className="mt-[2rem] w-full rounded-[0.8rem] bg-navbar py-[1.2rem] text-[1.4rem]
							font-medium text-white hover:bg-primary md:rounded-[1rem] md:py-[1.5rem]
							md:text-[1.6rem]"
					>
						Edit Profile
					</Button>
				</div>

				{/* Order History */}
				<div className="rounded-lg bg-gray-50 p-[1.6rem] dark:bg-gray-800 md:p-[2rem]">
					<h2 className="mb-[1.6rem] text-[1.8rem] font-medium md:mb-[2rem] md:text-[2rem]">
						Recent Orders
					</h2>

					<div className="text-[1.4rem] text-gray-600 dark:text-gray-400 md:text-[1.6rem]">
						No orders yet
					</div>

					<Button
						asChild={true}
						theme="primary"
						className="mt-[2rem] w-full rounded-[0.8rem] bg-navbar py-[1.2rem] text-[1.4rem]
							font-medium text-white hover:bg-primary md:rounded-[1rem] md:py-[1.5rem]
							md:text-[1.6rem]"
					>
						<Link to="/">Start Shopping</Link>
					</Button>
				</div>
			</section>
		</main>
	);
}

export default UserAccountPage;
