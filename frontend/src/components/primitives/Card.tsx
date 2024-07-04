import type { PolymorphicProps } from "@/lib/type-helpers/polymorphism";

type CardProps = {
	className?: string;
	children?: React.ReactNode;
	aosAnimation?: string;
	aosDuration?: string;
	aosEasing?: string;
};

type OtherCardProps = {
	className?: string;
	children?: React.ReactNode;
};

function Card<TElement extends React.ElementType = "article">(
	props: PolymorphicProps<TElement, CardProps>
) {
	const { as: Element = "article", children, className, ...restOfProps } = props;

	return (
		<Element className={className} {...restOfProps}>
			{children}
		</Element>
	);
}

function CardHeader<TElement extends React.ElementType = "header">(
	props: PolymorphicProps<TElement, OtherCardProps>
) {
	const { as: Element = "header", children, className, ...restOfProps } = props;

	return (
		<Element className={className} {...restOfProps}>
			{children}
		</Element>
	);
}

function CardBody<TElement extends React.ElementType = "div">(
	props: PolymorphicProps<TElement, OtherCardProps>
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
