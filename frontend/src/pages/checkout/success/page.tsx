import { Button } from "@/components/primitives";
import { Link } from "react-router";

function CheckoutSuccessPage() {
	return (
		<main className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-[120rem] flex-col items-center justify-center px-[1.6rem] py-[2rem] md:px-[4rem] md:py-[3rem]">
			<div className="flex max-w-[50rem] flex-col items-center gap-[2rem] rounded-lg bg-gray-50 p-[2rem] text-center dark:bg-gray-800 md:p-[4rem]">
				<div className="flex size-[8rem] items-center justify-center rounded-full bg-success text-[4rem] text-white">
					✓
				</div>

				<div className="flex flex-col gap-[1rem]">
					<h1 className="text-[2.4rem] font-[700] md:text-[3.2rem]">
						Payment Successful!
					</h1>

					<p className="text-[1.4rem] text-gray-600 dark:text-gray-400 md:text-[1.6rem]">
						Thank you for your order. Your payment has been processed successfully.
					</p>
				</div>

				<Button
					asChild={true}
					theme="primary"
					className="mt-[1rem] w-full rounded-[0.8rem] bg-navbar py-[1.2rem] text-[1.4rem]
						font-medium text-white hover:bg-primary md:mt-[2rem] md:rounded-[1rem]
						md:py-[1.5rem] md:text-[1.6rem]"
				>
					<Link to="/">Continue Shopping</Link>
				</Button>
			</div>
		</main>
	);
}

export default CheckoutSuccessPage;
