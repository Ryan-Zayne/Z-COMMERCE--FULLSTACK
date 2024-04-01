import type { PolymorphicProps } from "@/lib/type-helpers/polymorpism-helper";

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
	const {
		as: Element = "article",
		children,
		className = "",
		aosAnimation = "",
		aosDuration = "",
		aosEasing = "",
	} = props;

	return (
		<Element
			data-aos={aosAnimation}
			data-aos-duration={aosDuration}
			data-aos-anchor-easing={aosEasing}
			className={className}
		>
			{children}
		</Element>
	);
}

function CardHeader<TElement extends React.ElementType = "header">(
	props: PolymorphicProps<TElement, OtherCardProps>
) {
	const { as: Element = "header", children, className } = props;

	return <Element className={className}>{children}</Element>;
}

function CardBody<TElement extends React.ElementType = "div">(
	props: PolymorphicProps<TElement, OtherCardProps>
) {
	const { as: Element = "div", children, className = "" } = props;

	return <Element className={className}>{children}</Element>;
}

function CardFooter<TElement extends React.ElementType = "footer">(
	props: PolymorphicProps<TElement, OtherCardProps>
) {
	const { as: Element = "footer", children, className = "" } = props;

	return <Element className={className}>{children}</Element>;
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
