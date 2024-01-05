import type { PolymorphicProps } from "@/lib/types/polymorpic-props-helper";

type CardProps = {
	aosAnimation?: string;
	aosDuration?: string;
	aosEasing?: string;
};

function Card<TAsProp extends React.ElementType = "article">(props: PolymorphicProps<TAsProp, CardProps>) {
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

function CardHeader<TAsProp extends React.ElementType = "header">(props: PolymorphicProps<TAsProp>) {
	const { as: Element = "header", children, className } = props;

	return <Element className={className}>{children}</Element>;
}

function CardBody<TAsProp extends React.ElementType = "div">(props: PolymorphicProps<TAsProp>) {
	const { as: Element = "div", children, className = "" } = props;

	return <Element className={className}>{children}</Element>;
}

function CardFooter<TAsProp extends React.ElementType = "footer">(props: PolymorphicProps<TAsProp>) {
	const { as: Element = "footer", children, className = "" } = props;

	return <Element className={className}>{children}</Element>;
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
