import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss/types/config";

const tailwindConfig = {
	content: [
		"./index.html",
		"./src/**/*.{ts,tsx}",
		"./node_modules/@zayne-labs/ui-react/dist/esm/**/*.{js,ts,tsx}",
	],

	darkMode: ["class", "[data-theme='dark']"],

	plugins: [
		plugin((pluginObj) => {
			// eslint-disable-next-line ts-eslint/unbound-method
			const { addComponents, matchUtilities, matchVariant } = pluginObj;

			addComponents({
				".custom-scrollbar": {
					"&::-webkit-scrollbar": {
						width: "10px",
					},

					"&::-webkit-scrollbar-thumb": {
						backgroundColor: "hsl(206, 13%, 14%)",
						border: "1px solid hsl(0, 0%, 76%)",
						borderRadius: "10px",
					},

					"&::-webkit-scrollbar-track": {
						backgroundColor: "hsl(0, 0%, 76%)",
						borderRadius: "10px 10px 0 0",
					},
				},
			});

			addComponents({
				".navlink-transition": {
					"&::before": {
						backgroundColor: "var(--brand-inverse)",
						borderRadius: "50%",
						bottom: "20px",
						content: '""',
						height: "5px",
						left: "50%",
						opacity: "0",
						position: "absolute",
						transform: "translateX(-50%)",
						transition: `
							opacity 0.4s ease 0s,
							bottom 0.3s ease 0.1s,
							height 0.5s ease 0.3s,
							border-radius 0.2s ease 0.4s,
							width 0.5s ease 0.4s
							`,
						width: "5px",
					},

					"&:hover::before": {
						borderRadius: "20px",
						bottom: "-5px",
						height: "3px",
						opacity: "1",
						width: "calc(100% + 2px)",
					},

					position: "relative",
				},
			});

			matchUtilities({
				"box-shadow": (value) => ({
					boxShadow: value,
				}),
			});

			matchVariant(
				"nth",

				(value) => `&:nth-child(${value})`,

				{
					values: {
						1: "1",
						2: "2",
					},
				}
			);
		}),
	],

	theme: {
		backgroundImage: {
			"footer-image":
				"url('https://res.cloudinary.com/djvestif4/image/upload/v1700101462/z-commerce/newsletter-bg_yqqx6n.webp')",
			"glitter-image":
				"url('https://res.cloudinary.com/djvestif4/image/upload/v1700101265/z-commerce/glitter.webp')",
			"yellow-cart":
				"url('https://res.cloudinary.com/djvestif4/image/upload/v1700101265/z-commerce/yellow-cart-bg.webp')",
		},

		extend: {
			animation: {
				"fade-in-down": "fade-in-down 1.3s",
				"fade-in-up": "fade-in-up 1.7s ease-out",
				"fade-in-up-2": "fade-in-up-2 1.3s ease-out",
				flicker: "flicker 3s linear infinite",
				shake: "shake 0.2s ease-in-out 0s 3",
				zoom: "zoom 3s infinite linear",
			},

			colors: {
				body: "var(--color-body)",
				"brand-inverse": "var(--brand-inverse)",
				"carousel-btn": "var(--carousel-btn)",
				"carousel-dot": "var(--carousel-dot)",
				dark: "var(--text-dark)",
				"dark-ball": "var(--dark-mode-ball)",
				error: "var(--color-error)",
				facebook: "var(--color-facebook)",
				heading: "var(--text-header)",

				heroui: {
					content: "hsl(240 3.7% 15.88%)",
					default: "hsl(240 5.03% 64.9%)",
				},

				input: "var(--text-input)",
				label: "var(--text-label)",
				light: "var(--text-light)",
				"nav-text": "var(--text-navbar)",
				navbar: "var(--color-navbar)",
				placeholder: "var(--text-placeholder)",
				primary: "var(--color-primary)",
				secondary: "var(--color-secondary)",

				shadcn: {
					background: "hsl(0 0% 100%)",
					border: "theme(colors.input)",
					foreground: "hsl(222.2 47.4% 11.2%)",
					input: "hsl(214.3 31.8% 91.4%)",
					muted: "hsl(210 40% 96.1%)",
					"muted-foreground": "hsl(215.4 16.3% 46.9%)",
					primary: "hsl(222.2 47.4% 11.2%)",
					"primary-foreground": "hsl(210 40% 98%)",
					ring: "hsl(215 20.2% 65.1%)",
				},

				sonner: {
					"error-bg": "hsl(358 76% 10%)",
					"error-border": "hsl(357 89% 16%)",
					"error-text": "hsl(358 100% 81%)",
					"success-bg": "hsl(150 100% 6%)",
					"success-border": "hsl(147 100% 12%)",
					"success-text": "hsl(150 100% 90%)",
				},
			},

			fontFamily: {
				roboto: ["Roboto Slab", "Helvetica"],
				rubik: ["Rubik", "Trebuchet MS"],
			},

			fontWeight: {
				300: "300",
				400: "400",
				500: "500",
				600: "600",
			},

			keyframes: {
				"fade-in-down": {
					from: { opacity: "0", transform: "translateY(-80%)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},

				"fade-in-up": {
					from: { opacity: "0", transform: "translateY(100%)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},

				"fade-in-up-2": {
					from: { opacity: "0", transform: "translateY(150%)" },
					to: { opacity: "0.86", transform: "translateY(0)" },
				},

				flicker: {
					"0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, to": {
						filter:
							"drop-shadow(0 0 1px rgba(252,211,77)) drop-shadow(0 0 15px rgba(245,158,11)) drop-shadow(0 0 1px rgba(252,211,77))",
						opacity: ".99",
					},

					"20%, 21.999%, 63%, 63.999%, 65%, 69.999%": {
						filter: "none",
						opacity: ".4",
					},
				},

				shake: {
					"0%, 100%": { transform: "translateX(0px)" },
					"25%": { transform: "translateX(6px)" },
					"75%": { transform: "translateX(-6px)" },
				},

				zoom: {
					from: { transform: "translateX(-300%)" },
					to: { transform: "translateX(100%)" },
				},
			},

			transitionTimingFunction: {
				"slide-in": "cubic-bezier(0.51, 0.03, 0.64, 0.28)",
				"slide-out": "cubic-bezier(0.33, 0.85, 0.56, 1.02)",
			},
		},

		screens: {
			lg: "1000px",
			md: "768px",
			sm: "480px",
			xl: "1280px",
		},
	},
} satisfies Config;

export default tailwindConfig;
