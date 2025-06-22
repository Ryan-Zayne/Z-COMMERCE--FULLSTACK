import { useThemeStore } from "@/store/zustand/themeStore";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

function SonnerToaster(props: ToasterProps) {
	const theme = useThemeStore((state) => state.theme as ToasterProps["theme"]);

	return (
		<Sonner
			theme={theme}
			// eslint-disable-next-line tailwindcss/no-custom-classname
			className="toaster group max-md:inset-x-0 max-md:flex max-md:w-full max-md:justify-center"
			position="bottom-right"
			duration={3000}
			closeButton={true}
			toastOptions={{
				classNames: {
					actionButton:
						"group-[.toast]:bg-shadcn-primary group-[.toast]:text-shadcn-primary-foreground",

					cancelButton: "group-[.toast]:bg-shadcn-muted group-[.toast]:text-shadcn-muted-foreground",

					closeButton:
						"group-[.toaster]:bg-inherit group-[.toaster]:text-inherit group-[.toaster]:border-inherit hover:group-[.toaster]:data-close-button:border-inherit hover:group-[.toaster]:data-close-button:bg-inherit",

					description:
						"group-[.toaster]:text-[14px] group-[.toast]:text-shadcn-muted-foreground group-[.toast.error]:text-inherit group-[.toast.success]:text-inherit",

					error: "group error group-[.toaster]:data-[type=error]:bg-sonner-error-bg group-[.toaster]:data-[type=error]:text-sonner-error-text group-[.toaster]:data-[type=error]:border-sonner-error-border",

					success:
						"group success group-[.toaster]:data-[type=success]:bg-sonner-success-bg group-[.toaster]:data-[type=success]:text-sonner-success-text data-[type=success]:border-sonner-success-border",

					title: "group-[.toaster]:text-[16px] group-[.toaster]:font-bold",

					toast: "group toast p-[20px] max-md:p-[16px] mx-auto max-md:h-auto max-md:max-w-[284px] group-[.toaster]:shadow-lg group-[.toaster]:bg-shadcn-background group-[.toaster]:text-shadcn-foreground group-[.toaster]:border-shadcn-border",
				},
			}}
			{...props}
		/>
	);
}

export { SonnerToaster };
