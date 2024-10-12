import { Logo, Show } from "@/components/primitives";
import { useGlobalStore } from "@/store/zustand/globalStore";
import { Outlet } from "react-router-dom";

function AuthLayout() {
	const isDesktop = useGlobalStore((state) => state.isDesktop);

	return (
		<>
			<Show when={isDesktop}>
				<Show.Content>
					<link
						rel="preload"
						href={"https://res.cloudinary.com/djvestif4/image/upload/v1700101265/glitter.webp"}
						as="image"
					/>
					<link
						rel="preload"
						href="https://res.cloudinary.com/djvestif4/image/upload/v1700101265/yellow-cart-bg.webp"
						as="image"
					/>
				</Show.Content>

				<Show.Fallback>
					<link
						rel="preload"
						href="https://res.cloudinary.com/djvestif4/image/upload/v1700101265/yellow-cart-bg.webp"
						as="image"
					/>
					<link
						rel="preload"
						href={"https://res.cloudinary.com/djvestif4/image/upload/v1700101265/glitter.webp"}
						as="image"
					/>
				</Show.Fallback>
			</Show>

			<section
				className="relative flex min-h-svh items-center justify-center overflow-x-hidden bg-yellow-cart
					bg-cover bg-no-repeat md:py-[2rem] lg:justify-between lg:bg-glitter-image lg:px-[10rem]"
			>
				<span id="Background Overlay" className="absolute inset-0 z-[1] bg-[hsl(0,0%,0%,0.45)]" />

				{isDesktop && (
					<Logo
						className={`relative bottom-[1rem] z-10 ml-[-0.8rem] w-[20rem] brightness-[0.8]
						contrast-[1.7] lg:left-[4rem]`}
					/>
				)}

				<Outlet />
			</section>
		</>
	);
}

export default AuthLayout;
