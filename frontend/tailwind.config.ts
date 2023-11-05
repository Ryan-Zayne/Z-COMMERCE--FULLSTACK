import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss/types/config';

const config = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: ['class', '[data-theme="dark"]'],

	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '1000px',
			xl: '1280px',
		},

		backgroundImage: {
			'footer-image': "url('/src/assets/footerImages/newsletter-bg.webp')",
			'glitter-image': "url('/src/assets/registerPageImages/glitter.webp')",
			'yellow-cart': "url('/src/assets/registerPageImages/yellow-cart-bg.webp')",
		},

		extend: {
			colors: {
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
				body: 'var(--color-body)',
				'carousel-btn': 'var(--carousel-btn)',
				'carousel-dot': 'var(--carousel-dot)',
				heading: 'var(--text-header)',
				dark: 'var(--text-dark)',
				light: 'var(--text-light)',
				facebook: 'var(--color-facebook)',
				placeholder: 'var(--text-placeholder)',
				navbar: 'var(--color-navbar)',
				'nav-text': 'var(--text-navbar)',
				'dark-ball': 'var(--dark-mode-ball)',
				input: 'var(--text-input)',
				label: 'var(--text-label)',
				error: 'var(--color-error)',
			},

			fontFamily: {
				roboto: ["'Roboto Slab'", 'Helvetica'],
				rubik: ["'Rubik'", 'Trebuchet MS'],
			},

			fontWeight: {
				300: '300',
				400: '400',
				500: '500',
				600: '600',
			},

			transitionTimingFunction: {
				'slide-in': 'cubic-bezier(0.51, 0.03, 0.64, 0.28)',
				'slide-out': 'cubic-bezier(0.33, 0.85, 0.56, 1.02)',
			},

			animation: {
				'fade-in-down': 'fade-in-down 1.3s',
				'fade-in-up': 'fade-in-up 1.7s ease-out',
				'fade-in-up-2': 'fade-in-up-2 1.3s ease-out',
				zoom: 'zoom 1.3s infinite linear 0.1s',
				flicker: 'flicker 3s linear infinite',
				shake: 'shake 0.2s ease-in-out 0s 3',
			},

			keyframes: {
				'fade-in-down': {
					from: { opacity: '0', transform: 'translateY(-80%)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-in-up': {
					from: { opacity: '0', transform: 'translateY(100%)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-in-up-2': {
					from: { opacity: '0', transform: 'translateY(150%)' },
					to: { opacity: '0.86', transform: 'translateY(0)' },
				},

				zoom: {
					from: { transform: 'translateX(-300%)' },
					to: { transform: 'translateX(100%)' },
				},

				flicker: {
					'0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, to': {
						opacity: '.99',
						filter:
							'drop-shadow(0 0 1px rgba(252,211,77)) drop-shadow(0 0 15px rgba(245,158,11)) drop-shadow(0 0 1px rgba(252,211,77))',
					},

					'20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
						opacity: '.4',
						filter: 'none',
					},
				},

				shake: {
					'0%, 100%': { transform: 'translateX(0rem)' },
					'25%': { transform: 'translateX(0.6rem)' },
					'75%': { transform: 'translateX(-0.6rem)' },
				},
			},
		},
	},

	plugins: [
		plugin(({ matchVariant, matchUtilities, addComponents }) => {
			// addVariant('hocus', ['&:hover', '&:focus']);

			addComponents({
				'.custom-scrollbar': {
					'&::-webkit-scrollbar': {
						width: '1rem',
					},

					'&::-webkit-scrollbar-track': {
						backgroundColor: 'hsl(0, 0%, 76%)',
						borderRadius: '1rem 1rem 0 0',
					},

					'&::-webkit-scrollbar-thumb': {
						backgroundColor: 'hsl(206, 13%, 14%)',
						border: '1px solid hsl(0, 0%, 76%)',
						borderRadius: '1rem',
					},
				},

				'.navlink-transition': {
					'&::before': {
						content: '""',
						position: 'absolute',
						bottom: '2rem',
						left: '50%',
						backgroundColor: 'var(--brand-inverse)',
						opacity: '0',
						transform: 'translateX(-50%)',
						height: ' 0.5rem',
						width: '0.5rem',
						borderRadius: '50%',
						transition: `opacity 0.4s ease 0s,
										 bottom 0.3s ease 0.1s,
										 height 0.5s ease 0.3s,
										 border-radius 0.2s ease 0.4s,
										 width 0.5s ease 0.4s`,
					},

					'&:hover::before': {
						bottom: '-0.5rem',
						height: '0.3rem',
						width: 'calc(100% + 0.2rem)',
						borderRadius: '2rem',
						opacity: '1',
					},
				},
			});

			matchUtilities(
				{
					'box-shadow': (value) => ({
						boxShadow: value,
					}),
				},

				{
					values: {},
				}
			);

			matchVariant(
				'nth',

				(value) => `&:nth-child(${value})`,

				{
					values: {
						1: '1',
						2: '2',
					},
				}
			);
		}),
	],
} satisfies Config;

export default config;
