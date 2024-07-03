import { IconBox } from "./IconBox";

type StarRatingProps = {
	rating: number;
	text?: string;
	className?: string;
	icon?: string;
};

function StarRating(props: StarRatingProps) {
	const { rating, text = "", className = "", icon = "ant-design:star-filled" } = props;

	const star5 = [...Array(5).keys()].map((id) => (
		<IconBox icon={icon} key={id} color="var(--text-header)" />
	));

	const star4 = [...Array(5).keys()].map((id, index) =>
		index === 4 ? (
			<IconBox icon={icon} key={id} color="var(--text-dark)" />
		) : (
			<IconBox icon={icon} key={id} color="var(--text-header)" />
		)
	);

	return (
		<div className={`mt-[1rem] flex items-center gap-[1rem] text-[1.2rem] ${className}`}>
			<span className="flex">{rating > 4.5 ? star5 : star4}</span>
			<span>
				{rating} {text}
			</span>
		</div>
	);
}

export default StarRating;
