import { nextui } from "@nextui-org/theme";
import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss/types/config";

const tailwindConfig = {
	content: [
		"./index.html",
		"./src/**/*.{ts,tsx}",
		"./node_modules/@nextui-org/theme/dist/components/pagination.js",
	],
	darkMode: ["class", '[data-theme="dark"]'],

	theme: {
		screens: {
			sm: "480px",
			md: "768px",
			lg: "1000px",
			xl: "1280px",
		},

		backgroundImage: {
			"footer-image":
				"url('https://res.cloudinary.com/djvestif4/image/upload/v1700101462/newsletter-bg_yqqx6n.webp')",
			"glitter-image":
				"url('https://res.cloudinary.com/djvestif4/image/upload/v1700101265/glitter.webp')",
			"yellow-cart":
				"url('https://res.cloudinary.com/djvestif4/image/upload/v1700101265/yellow-cart-bg.webp')",
		},

		extend: {
			colors: {
				primary: "var(--color-primary)",
				secondary: "var(--color-secondary)",
				body: "var(--color-body)",
				heading: "var(--text-header)",
				dark: "var(--text-dark)",
				light: "var(--text-light)",
				facebook: "var(--color-facebook)",
				placeholder: "var(--text-placeholder)",
				navbar: "var(--color-navbar)",
				input: "var(--text-input)",
				label: "var(--text-label)",
				error: "var(--color-error)",
				"carousel-btn": "var(--carousel-btn)",
				"carousel-dot": "var(--carousel-dot)",
				"nav-text": "var(--text-navbar)",
				"dark-ball": "var(--dark-mode-ball)",
				"brand-inverse": "var(--brand-inverse)",

				// Shadcn colors

				"shadcn-input": "hsl(214.3 31.8% 91.4%)",
				border: "theme(colors.input)",
				"muted-foreground": "hsl(215.4 16.3% 46.9%)",
				"shadcn-ring": "hsl(215 20.2% 65.1%)",
				"shadcn-primary": "hsl(222.2 47.4% 11.2%)",
				background: "hsl(0 0% 100%)",
				foreground: "hsl(222.2 47.4% 11.2%)",
				"primary-foreground": "hsl(210 40% 98%)",
				muted: "hsl(210 40% 96.1%)",

				// Sonner toast colors
				"success-bg": "hsl(150 100% 6%)",
				"success-text": "hsl(150 100% 90%)",
				"success-border": "hsl(147 100% 12%)",
				"error-bg": "hsl(358 76% 10%)",
				"error-text": "hsl(358 100% 81%)",
				"error-border": "hsl(357 89% 16%)",
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

			transitionTimingFunction: {
				"slide-in": "cubic-bezier(0.51, 0.03, 0.64, 0.28)",
				"slide-out": "cubic-bezier(0.33, 0.85, 0.56, 1.02)",
			},

			keyframes: {
				zoom: {
					from: { transform: "translateX(-300%)" },
					to: { transform: "translateX(100%)" },
				},

				shake: {
					"0%, 100%": { transform: "translateX(0rem)" },
					"25%": { transform: "translateX(0.6rem)" },
					"75%": { transform: "translateX(-0.6rem)" },
				},

				flicker: {
					"0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, to": {
						opacity: ".99",
						filter:
							"drop-shadow(0 0 1px rgba(252,211,77)) drop-shadow(0 0 15px rgba(245,158,11)) drop-shadow(0 0 1px rgba(252,211,77))",
					},

					"20%, 21.999%, 63%, 63.999%, 65%, 69.999%": {
						opacity: ".4",
						filter: "none",
					},
				},

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
			},

			animation: {
				zoom: "zoom 3s infinite linear",
				flicker: "flicker 3s linear infinite",
				shake: "shake 0.2s ease-in-out 0s 3",
				"fade-in-down": "fade-in-down 1.3s",
				"fade-in-up": "fade-in-up 1.7s ease-out",
				"fade-in-up-2": "fade-in-up-2 1.3s ease-out",
			},
		},
	},

	plugins: [
		nextui(),
		plugin((pluginObj) => {
			// eslint-disable-next-line @typescript-eslint/unbound-method
			const { matchVariant, matchUtilities, addComponents } = pluginObj;

			addComponents({
				".custom-scrollbar": {
					"&::-webkit-scrollbar": {
						width: "1rem",
					},

					"&::-webkit-scrollbar-track": {
						backgroundColor: "hsl(0, 0%, 76%)",
						borderRadius: "1rem 1rem 0 0",
					},

					"&::-webkit-scrollbar-thumb": {
						backgroundColor: "hsl(206, 13%, 14%)",
						border: "1px solid hsl(0, 0%, 76%)",
						borderRadius: "1rem",
					},
				},
			});

			addComponents({
				".navlink-transition": {
					"&::before": {
						content: '""',
						position: "absolute",
						bottom: "2rem",
						left: "50%",
						backgroundColor: "var(--brand-inverse)",
						opacity: "0",
						transform: "translateX(-50%)",
						height: " 0.5rem",
						width: "0.5rem",
						borderRadius: "50%",
						transition: `
							opacity 0.4s ease 0s,
							bottom 0.3s ease 0.1s,
							height 0.5s ease 0.3s,
							border-radius 0.2s ease 0.4s,
							width 0.5s ease 0.4s
							`,
					},

					"&:hover::before": {
						bottom: "-0.5rem",
						height: "0.3rem",
						width: "calc(100% + 0.2rem)",
						borderRadius: "2rem",
						opacity: "1",
					},
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
} satisfies Config;

export default tailwindConfig;
