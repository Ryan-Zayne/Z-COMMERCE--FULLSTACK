import { callDummyApi } from "@/api/callDummyApi";
import { Button, type ButtonProps } from "@/components/primitives";
import { useDebouncedState } from "@/lib/hooks/useDebounce";
import { cnMerge } from "@/lib/utils/cn";
import type { DummyResponseData } from "@/store/react-query/react-query-store.types";
import { useState } from "react";
import type { IconType } from "react-icons";
import { BiSearchAlt2 } from "react-icons/bi";

type SearchFormProps = Pick<ButtonProps, "theme" | "variant" | "size" | "text"> & {
	className?: string;
	btnClassName?: string;
	inputClassName?: string;
	buttonIcon?: IconType;
	placeholder?: string;
	type?: "search" | "subscribe";
	"z-index"?: `z-[${number}]`;
};

const fetchSearchProducts = async (
	searchTerm: string,
	setData: React.Dispatch<React.SetStateAction<DummyResponseData["products"]>>
) => {
	const { dataInfo } = await callDummyApi(`/products/search/${searchTerm}`);

	if (dataInfo) {
		setData(dataInfo.products);
	}
};

function SearchForm(props: SearchFormProps) {
	const {
		type = "search",
		className = "",
		btnClassName = "",
		inputClassName = "",
		buttonIcon: ButtonIcon = BiSearchAlt2 as IconType,
		theme = "secondary",
		variant = "input",
		size = "sm",
		placeholder = type === "search" ? "Search for products..." : "Enter Your Email address...",
		"z-index": zIndex = "z-[100]",
		text,
	} = props;

	const [searchTerm, setSearchTerm] = useState("");

	const debouncedSearchProducts = useDebouncedState(searchTerm, { delay: 500 });

	// useEffect(() => {
	// 	fetchSearchProducts();
	// }, [debouncedSearchProducts]);

	return (
		<form className={cnMerge("relative flex items-center", type === "search" && zIndex, className)}>
			<input
				className={cnMerge(
					`w-full rounded-[2.5rem_0_0_2.5rem] border-secondary bg-[--color-body,_white] py-[0.6rem] pl-[2.3rem] transition-[box-shadow] duration-200 [border-width:2px_0_2px_2px] placeholder:font-[500] placeholder:text-placeholder focus-within:shadow-[1px_0_10px_2px_var(--color-secondary)] max-sm:placeholder:text-[1.4rem]`,
					[inputClassName]
				)}
				type={type === "search" ? "search" : "email"}
				name={type}
				placeholder={placeholder}
				onChange={type === "search" ? (e) => setSearchTerm(e.target.value) : undefined}
			/>
			<Button
				type="button"
				className={cnMerge(
					`px-[2.1rem] text-[1.8rem] transition-[colors,scale] duration-300 hover:bg-primary hover:text-heading active:scale-[1.08]`,
					btnClassName
				)}
				variant={variant}
				theme={theme}
				size={size}
			>
				{text ?? <ButtonIcon />}
			</Button>
		</form>
	);
}

export default SearchForm;
