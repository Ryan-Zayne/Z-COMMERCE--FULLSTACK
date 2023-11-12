import { cnMerge } from '@/lib/utils/cn';
import { forwardRef } from 'react';

export type ButtonProps = React.ComponentPropsWithRef<'button'> & {
	/* eslint-disable no-use-before-define */
	theme?: keyof typeof semanticClasses.themes;
	variant?: keyof typeof semanticClasses.variants;
	size?: keyof typeof semanticClasses.sizes;
	text?: string;
};

const semanticClasses = {
	base: 'flex items-center justify-center',

	variants: {
		regular: 'rounded-[0.5rem]',
		input: 'rounded-[0_2.5rem_2.5rem_0]',
		cart: 'rounded-[0.8rem]',
		shop: 'rounded-[2.5rem]',
	},

	themes: {
		primary: 'bg-primary text-white',
		secondary: 'bg-secondary text-dark',
		ghost: 'bg-transparent text-dark',
	},

	sizes: {
		sm: 'p-[1.11rem_1.3rem]',
		md: 'p-[1.1rem_3.5rem]',
		lg: 'p-[1.1rem_4.5rem]',
	},
};

function Button(props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) {
	const {
		children,
		className = '',
		theme = 'ghost',
		variant = 'regular',
		size = 'md',
		text,
		...otherValidBtnProps
	} = props;

	const BTN_CLASSES = cnMerge(
		semanticClasses.base,
		semanticClasses.variants[variant],
		semanticClasses.themes[theme],
		semanticClasses.sizes[size],
		className
	);

	return (
		<button className={BTN_CLASSES} ref={ref} {...otherValidBtnProps}>
			{children ?? text}
		</button>
	);
}

export default forwardRef(Button);
