import type { PolymorphicProps, PolymorphicPropsWithRef } from "@zayne-labs/toolkit/react";

type CardProps = {
	aosAnimation?: string;
	aosDuration?: string;
	aosEasing?: string;
	children?: React.ReactNode;
	className?: string;
};

type OtherCardProps = {
	children?: React.ReactNode;
	className?: string;
};

function Card<TElement extends React.ElementType = "article">(
	props: PolymorphicPropsWithRef<TElement, CardProps>
) {
	const { as: Element = "article", children, className, ...restOfProps } = props;

	return (
		<Element className={className} {...restOfProps}>
			{children}
		</Element>
	);
}

function CardHeader<TElement extends React.ElementType = "header">(
	props: PolymorphicPropsWithRef<TElement, OtherCardProps>
) {
	const { as: Element = "header", children, className, ...restOfProps } = props;

	return (
		<Element className={className} {...restOfProps}>
			{children}
		</Element>
	);
}

function CardBody<TElement extends React.ElementType = "div">(
	props: PolymorphicPropsWithRef<TElement, OtherCardProps>
) {
	const { as: Element = "div", children, className, ...restOfProps } = props;

	return (
		<Element className={className} {...restOfProps}>
			{children}
		</Element>
	);
}

function CardFooter<TElement extends React.ElementType = "footer">(
	props: PolymorphicProps<TElement, OtherCardProps>
) {
	const { as: Element = "footer", children, className, ...restOfProps } = props;

	return (
		<Element className={className} {...restOfProps}>
			{children}
		</Element>
	);
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
