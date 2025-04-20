import { Button, Form, ImageComponent, Show, getElementList } from "@/components/primitives";
import { callBackendApi } from "@/lib/api/callBackendApi";
import { sessionQuery } from "@/store/react-query/queryFactory";
import { useShopStore } from "@/store/zustand/shopStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { isHTTPError } from "@zayne-labs/callapi/utils";
import { hardNavigate } from "@zayne-labs/toolkit-core";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CheckoutSchema = z.object({
	address: z.string().min(10, "Please enter your full address"),
	city: z.string().min(2, "Please enter your city"),
	country: z.string().min(2, "Please enter your country"),
	email: z.string().email("Please enter a valid email"),
	username: z.string().min(1, "Username is required"),
	zipCode: z.string().min(4, "Please enter a valid zip code"),
});

const [CartItemsList] = getElementList();

function CheckoutPage() {
	const cart = useShopStore((state) => state.cart);
	const cartActions = useShopStore((state) => state.actions);

	const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0); // Compute total price via zustand store subscription in future

	const sessionQueryResult = useQuery(sessionQuery());

	const methods = useForm({
		resolver: zodResolver(CheckoutSchema),

		values: {
			address: "",
			city: "",
			country: "",
			email: sessionQueryResult.data?.user.email ?? "",
			username: sessionQueryResult.data?.user.username ?? "",
			zipCode: "",
		},
	});

	const { control } = methods;

	const onSubmit = methods.handleSubmit(async (formData) => {
		const payload = {
			amount: totalPrice,
			cartItems: cart.map((item) => ({
				id: String(item.id),
				name: item.title,
				price: item.price,
				quantity: item.quantity,
			})),
			customerEmail: formData.email,
			customerId: sessionQueryResult.data?.user.id ?? "",
			redirectURL: `${window.location.origin}/checkout/success`,
		};

		const result = await callBackendApi<{ paymentUrl: string }>("/payment/paystack/initialize", {
			body: payload,
			method: "POST",
		});

		if (isHTTPError(result.error)) {
			methods.setError("root.serverError", {
				message: result.error.errorData.message,
			});
			return;
		}

		if (result.error) {
			methods.setError("root.caughtError", {
				message: result.error.message,
			});
			return;
		}

		cartActions.clearCart();

		hardNavigate(result.data.data?.paymentUrl as string);
	});

	return (
		<main className="mx-auto max-w-[120rem] px-[1.6rem] py-[2rem] md:px-[4rem] md:py-[3rem]">
			<header className="flex items-center justify-between border-b pb-[1.6rem] md:pb-[2rem]">
				<h1 className="text-[2.4rem] font-[700] md:text-[3.2rem]">Checkout</h1>
			</header>

			<section
				className="mt-[2rem] flex flex-col gap-[3rem] md:mt-[4rem] md:flex-row-reverse md:gap-[4rem]"
			>
				<Form.Root
					methods={methods}
					className="mt-[2rem] flex flex-col gap-[2.4rem] text-[1.4rem] md:mt-[2.5rem] md:gap-[1.8rem]
						md:text-[1.6rem]"
					onSubmit={(event) => void onSubmit(event)}
				>
					<div className="grid gap-[2.4rem] md:grid-cols-2 md:gap-[2rem]">
						<div className="md:col-span-2">
							<Form.Field control={control} name="username">
								<Form.Label
									className="block text-[1.5rem] font-medium tracking-tight md:text-[1.6rem]"
								>
									Username
								</Form.Label>
								<Form.Input
									classNames={{
										error: `border-b-error focus-within:border-b-error
										dark:focus-within:border-b-error`,
										input: `min-h-[4rem] rounded-[0.8rem] border-[1px] border-carousel-btn
										bg-transparent px-[1.2rem] text-[1.5rem] text-input transition-colors
										duration-200 placeholder:text-gray-400 focus-within:border-navbar
										dark:focus-within:border-carousel-dot md:min-h-[4.4rem] md:text-[1.6rem]`,
									}}
									placeholder="John Doe"
								/>
								<Form.ErrorMessage
									className="mt-[0.4rem] text-[1.3rem] text-error md:text-[1.4rem]"
								/>
							</Form.Field>
						</div>

						<div className="md:col-span-2">
							<Form.Field control={control} name="email">
								<Form.Label
									className="block text-[1.5rem] font-medium tracking-tight md:text-[1.6rem]"
								>
									Email
								</Form.Label>
								<Form.Input
									classNames={{
										error: `border-b-error focus-within:border-b-error
										dark:focus-within:border-b-error`,
										input: `min-h-[4rem] rounded-[0.8rem] border-[1px] border-carousel-btn
										bg-transparent px-[1.2rem] text-[1.5rem] text-input transition-colors
										duration-200 placeholder:text-gray-400 focus-within:border-navbar
										dark:focus-within:border-carousel-dot md:min-h-[4.4rem] md:text-[1.6rem]`,
									}}
									placeholder="johndoe@example.com"
								/>
								<Form.ErrorMessage
									className="mt-[0.4rem] text-[1.3rem] text-error md:text-[1.4rem]"
								/>
							</Form.Field>
						</div>

						<div className="md:col-span-2">
							<Form.Field control={control} name="address">
								<Form.Label
									className="block text-[1.5rem] font-medium tracking-tight md:text-[1.6rem]"
								>
									Address
								</Form.Label>
								<Form.Input
									classNames={{
										error: `border-b-error focus-within:border-b-error
										dark:focus-within:border-b-error`,
										input: `min-h-[4rem] rounded-[0.8rem] border-[1px] border-carousel-btn
										bg-transparent px-[1.2rem] text-[1.5rem] text-input transition-colors
										duration-200 placeholder:text-gray-400 focus-within:border-navbar
										dark:focus-within:border-carousel-dot md:min-h-[4.4rem] md:text-[1.6rem]`,
									}}
									placeholder="123 Main St"
								/>
								<Form.ErrorMessage
									className="mt-[0.4rem] text-[1.3rem] text-error md:text-[1.4rem]"
								/>
							</Form.Field>
						</div>

						<div>
							<Form.Field control={control} name="city">
								<Form.Label
									className="block text-[1.5rem] font-medium tracking-tight md:text-[1.6rem]"
								>
									City
								</Form.Label>
								<Form.Input
									classNames={{
										error: `border-b-error focus-within:border-b-error
										dark:focus-within:border-b-error`,
										input: `min-h-[4rem] rounded-[0.8rem] border-[1px] border-carousel-btn
										bg-transparent px-[1.2rem] text-[1.5rem] text-input transition-colors
										duration-200 placeholder:text-gray-400 focus-within:border-navbar
										dark:focus-within:border-carousel-dot md:min-h-[4.4rem] md:text-[1.6rem]`,
									}}
									placeholder="New York"
								/>
								<Form.ErrorMessage
									className="mt-[0.4rem] text-[1.3rem] text-error md:text-[1.4rem]"
								/>
							</Form.Field>
						</div>

						<div>
							<Form.Field control={control} name="country">
								<Form.Label
									className="block text-[1.5rem] font-medium tracking-tight md:text-[1.6rem]"
								>
									Country
								</Form.Label>
								<Form.Input
									classNames={{
										error: `border-b-error focus-within:border-b-error
										dark:focus-within:border-b-error`,
										input: `min-h-[4rem] rounded-[0.8rem] border-[1px] border-carousel-btn
										bg-transparent px-[1.2rem] text-[1.5rem] text-input transition-colors
										duration-200 placeholder:text-gray-400 focus-within:border-navbar
										dark:focus-within:border-carousel-dot md:min-h-[4.4rem] md:text-[1.6rem]`,
									}}
									placeholder="United States"
								/>
								<Form.ErrorMessage
									className="mt-[0.4rem] text-[1.3rem] text-error md:text-[1.4rem]"
								/>
							</Form.Field>
						</div>

						<div>
							<Form.Field control={control} name="zipCode">
								<Form.Label
									className="block text-[1.5rem] font-medium tracking-tight md:text-[1.6rem]"
								>
									ZIP Code
								</Form.Label>
								<Form.Input
									classNames={{
										error: `border-b-error focus-within:border-b-error
										dark:focus-within:border-b-error`,
										input: `min-h-[4rem] rounded-[0.8rem] border-[1px] border-carousel-btn
										bg-transparent px-[1.2rem] text-[1.5rem] text-input transition-colors
										duration-200 placeholder:text-gray-400 focus-within:border-navbar
										dark:focus-within:border-carousel-dot md:min-h-[4.4rem] md:text-[1.6rem]`,
									}}
									placeholder="10001"
								/>
								<Form.ErrorMessage
									className="mt-[0.4rem] text-[1.3rem] text-error md:text-[1.4rem]"
								/>
							</Form.Field>
						</div>

						<Form.ErrorMessage
							className="text-center text-[1.4rem] font-medium text-error"
							errorField="caughtError"
							type="root"
						/>

						<Form.ErrorMessage
							className="text-center text-[1.4rem] text-error"
							errorField="serverError"
							type="root"
						/>

						<Form.SubscribeToFormState
							render={({ isSubmitting }) => (
								<Button
									type="submit"
									theme="primary"
									disabled={isSubmitting}
									isLoading={isSubmitting}
									className="mt-[2rem] w-full rounded-[0.8rem] bg-navbar py-[1.4rem] text-[1.5rem]
										font-[600] text-white shadow-sm transition-all hover:bg-primary
										hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed
										disabled:brightness-75 md:mt-[2.4rem] md:rounded-[1rem] md:py-[1.6rem]
										md:text-[1.6rem]"
								>
									Place Order
								</Button>
							)}
						/>
					</div>
				</Form.Root>

				{/* Order Summary */}
				<aside className="w-full rounded-lg bg-gray-50 p-[1.6rem] dark:bg-gray-800 md:p-[2rem]">
					<h2 className="mb-[1.6rem] text-[1.8rem] font-medium md:mb-[2rem] md:text-[2rem]">
						Order Summary
					</h2>

					<Show.Root when={cart.length > 0}>
						<div className="flex flex-col gap-[2rem]">
							<CartItemsList
								className="mt-[1.6rem] flex flex-col gap-[1.2rem] md:mt-[2rem] md:gap-[1.5rem]"
								each={cart}
								render={(item) => (
									<div
										key={item.id}
										className="flex items-center gap-[1.2rem] border-b pb-[1.2rem]
											md:gap-[1.5rem] md:pb-[1.5rem]"
									>
										<ImageComponent
											src={item.images[0]}
											alt={item.title}
											classNames={{
												image: "size-[6rem] rounded-md object-cover md:size-[8rem]",
												wrapper: "size-fit",
											}}
										/>

										<div>
											<h3 className="text-[1.4rem] font-[500] md:text-[1.6rem]">
												{item.title}
											</h3>
											<p
												className="text-[1.2rem] text-gray-600 dark:text-gray-400
													md:text-[1.4rem]"
											>
												Quantity: {item.quantity}
											</p>
											<p className="text-[1.4rem] font-[600] md:text-[1.6rem]">
												${item.price * item.quantity}
											</p>
										</div>
									</div>
								)}
							/>

							<div
								className="mt-[1.2rem] flex items-center justify-between text-[1.6rem]
									md:mt-[1.6rem] md:text-[1.8rem]"
							>
								<span>Total</span>
								<span className="font-medium">${totalPrice}</span>
							</div>
						</div>

						<Show.Otherwise>
							<p className="text-[1.6rem] font-[600] md:text-[1.8rem]">Your cart is empty</p>
						</Show.Otherwise>
					</Show.Root>
				</aside>
			</section>
		</main>
	);
}

export default CheckoutPage;
