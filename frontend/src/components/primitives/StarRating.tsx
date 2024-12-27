import { cnMerge } from "@/lib/utils/cn";
import { IconBox } from "./IconBox";

type StarRatingProps = {
	className?: string;
	icon?: string;
	rating: number;
	text?: string;
};

function StarRating(props: StarRatingProps) {
	const { className = "", icon = "ant-design:star-filled", rating, text = "" } = props;

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
		<div className={cnMerge("flex items-center gap-[1rem] text-[1.2rem]", className)}>
			<span className="flex">{rating > 4.5 ? star5 : star4}</span>
			<span>
				{rating} {text}
			</span>
		</div>
	);
}

export default StarRating;
