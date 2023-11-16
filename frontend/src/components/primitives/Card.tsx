type CardProps = {
	as?: keyof JSX.IntrinsicElements;
	children: React.ReactNode;
	className?: string;
	aosAnimation?: string;
	aosDuration?: string;
	aosEasing?: string;
};

type OtherCardProps = Pick<CardProps, 'as' | 'children' | 'className'>;

function Card(props: CardProps) {
	const {
		as: Element = 'article',
		children,
		className = '',
		aosAnimation = '',
		aosDuration = '',
		aosEasing = '',
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

function CardHeader({ as: Element = 'header', children, className = '' }: OtherCardProps) {
	return <Element className={className}>{children}</Element>;
}

function CardBody({ as: Element = 'div', children, className = '' }: OtherCardProps) {
	return <Element className={className}>{children}</Element>;
}

function CardFooter({ as: Element = 'footer', children, className = '' }: OtherCardProps) {
	return <Element className={className}>{children}</Element>;
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
