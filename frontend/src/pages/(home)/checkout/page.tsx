import { ImageComponent } from "@/components/primitives/ImageComponent";
import { Button } from "@/components/primitives/button";
import { Form } from "@/components/primitives/form";
import { callBackendApi } from "@/lib/api/callBackendApi";
import { sessionQuery } from "@/store/react-query/queryFactory";
import { useShopStore } from "@/store/zustand/shopStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { isHTTPError } from "@zayne-labs/callapi/utils";
import { hardNavigate } from "@zayne-labs/toolkit-core";
import { getElementList } from "@zayne-labs/ui-react/common/for";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
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
	const navigate = useNavigate();

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

	if (cart.length === 0) {
		return (
			<main className="mx-auto max-w-[120rem] px-[1.6rem] py-[2rem] md:px-[4rem] md:py-[3rem]">
				<header className="flex items-center justify-between border-b pb-[1.6rem] md:pb-[2rem]">
					<h1 className="text-[2.4rem] font-[700] md:text-[3.2rem]">Checkout</h1>
				</header>

				<div className="mt-[4rem] flex flex-col items-center justify-center gap-[2rem] text-center">
					<p className="text-[1.8rem] font-[500] text-gray-400">Your cart is empty</p>
					<Button
						theme="primary"
						className="rounded-[0.8rem] bg-navbar px-[2rem] py-[1rem] text-[1.6rem] font-[500]
							text-white transition-all hover:bg-primary"
						onClick={() => void navigate("/")}
					>
						Continue Shopping
					</Button>
				</div>
			</main>
		);
	}

	return (
		<main className="mx-auto max-w-[120rem] px-[1.6rem] py-[2rem] md:px-[4rem] md:py-[3rem]">
			<header className="flex items-center justify-between border-b pb-[1.6rem] md:pb-[2rem]">
				<h1 className="text-[2.4rem] font-[700] md:text-[3.2rem]">Checkout</h1>
			</header>

			<section
				className="mx-auto mt-[2rem] flex max-w-[120rem] flex-col gap-[3rem] px-[2rem] md:mt-[4rem]
					md:flex-row md:items-center md:gap-[4rem]"
			>
				<Form.Root
					methods={methods}
					className="w-full gap-[2.4rem]"
					onSubmit={(event) => void onSubmit(event)}
				>
					<div className="grid gap-[2.4rem] md:grid-cols-2 md:gap-[2rem]">
						<div className="md:col-span-2">
							<Form.Field control={control} name="username">
								<Form.Label className="text-[1.5rem] font-medium tracking-tight md:text-[1.6rem]">
									Username
								</Form.Label>
								<Form.Input
									classNames={{
										error: `border-b-error focus-within:border-b-error
										dark:focus-within:border-b-error`,
										input: `min-h-[4rem] rounded-[0.8rem] border-[1px] border-carousel-btn
										bg-transparent px-[1.2rem] text-[1.4rem] text-input transition-colors
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
								<Form.Label className="text-[1.5rem] font-medium tracking-tight md:text-[1.6rem]">
									Email
								</Form.Label>
								<Form.Input
									classNames={{
										error: `border-b-error focus-within:border-b-error
										dark:focus-within:border-b-error`,
										input: `min-h-[4rem] rounded-[0.8rem] border-[1px] border-carousel-btn
										bg-transparent px-[1.2rem] text-[1.4rem] text-input transition-colors
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
								<Form.Label className="text-[1.5rem] font-medium tracking-tight md:text-[1.6rem]">
									Address
								</Form.Label>
								<Form.Input
									classNames={{
										error: `border-b-error focus-within:border-b-error
										dark:focus-within:border-b-error`,
										input: `min-h-[4rem] rounded-[0.8rem] border-[1px] border-carousel-btn
										bg-transparent px-[1.2rem] text-[1.4rem] text-input transition-colors
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
								<Form.Label className="text-[1.5rem] font-medium tracking-tight md:text-[1.6rem]">
									City
								</Form.Label>
								<Form.Input
									classNames={{
										error: `border-b-error focus-within:border-b-error
										dark:focus-within:border-b-error`,
										input: `min-h-[4rem] rounded-[0.8rem] border-[1px] border-carousel-btn
										bg-transparent px-[1.2rem] text-[1.4rem] text-input transition-colors
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
							<Form.Field
								control={control}
								name="country"
								className="text-[1.5rem] md:text-[1.6rem]"
							>
								<Form.Label className="text-[1.5rem] font-medium tracking-tight md:text-[1.6rem]">
									Country
								</Form.Label>
								<Form.Input
									classNames={{
										error: `border-b-error focus-within:border-b-error
										dark:focus-within:border-b-error`,
										input: `min-h-[4rem] rounded-[0.8rem] border-[1px] border-carousel-btn
										bg-transparent px-[1.2rem] text-[1.4rem] text-input transition-colors
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
								<Form.Label className="text-[1.5rem] font-medium tracking-tight md:text-[1.6rem]">
									ZIP Code
								</Form.Label>
								<Form.Input
									classNames={{
										error: `border-b-error focus-within:border-b-error
										dark:focus-within:border-b-error`,
										input: `min-h-[4rem] rounded-[0.8rem] border-[1px] border-carousel-btn
										bg-transparent px-[1.2rem] text-[1.4rem] text-input transition-colors
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
							className="text-center text-[1.3rem] font-medium text-error"
							errorField="caughtError"
							type="root"
						/>

						<Form.ErrorMessage
							className="text-center text-[1.3rem] text-error"
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
									className="mt-[2rem] h-[4.4rem] w-full rounded-[0.8rem] bg-navbar text-[1.5rem]
										font-[600] text-white shadow-sm transition-all hover:bg-primary
										hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed
										disabled:brightness-75 md:mt-[2.4rem] md:rounded-[1rem] md:text-[1.6rem]"
								>
									Place Order
								</Button>
							)}
						/>
					</div>
				</Form.Root>

				<aside className="rounded-[0.8rem] bg-[#1c2128] p-[2rem] md:w-[50rem]">
					<h2 className="mb-[2rem] text-[1.8rem] font-[600]">Order Summary</h2>

					<div className="flex flex-col gap-[2rem] divide-y-[1px] divide-carousel-btn">
						<CartItemsList
							each={cart}
							render={(item) => (
								<div>
									<div key={item.id} className="flex gap-[1.6rem] pt-[2rem]">
										<div
											className="size-[7rem] shrink-0 overflow-hidden rounded-[0.8rem]
												bg-gray-800"
										>
											<ImageComponent
												src={item.images[0]}
												alt={item.title}
												className="size-full object-cover"
											/>
										</div>

										<div className="flex flex-1 justify-between gap-[1rem]">
											<div>
												<h3 className="text-[1.5rem] font-[500] leading-tight">
													{item.title}
												</h3>
												<p className="mt-[0.4rem] text-[1.3rem] text-gray-400">
													Quantity: {item.quantity}
												</p>
											</div>
											<p className="shrink-0 text-[1.5rem] font-[500]">
												${item.price.toLocaleString()}
											</p>
										</div>
									</div>
								</div>
							)}
						/>

						<div className="flex items-center justify-between pt-[2rem] text-base font-semibold">
							<p>Total</p>
							<p>${totalPrice.toLocaleString()}</p>
						</div>
					</div>
				</aside>
			</section>
		</main>
	);
}

export default CheckoutPage;
