import { cnMerge } from "@/lib/utils/cn";
import { useGetAllProducts } from "@/store/react-query/useGetAllProducts";
import { useGlobalStore } from "@/store/zustand/globalStore";
import { useSearch } from "@zayne-labs/toolkit-react";
import { useEffect } from "react";
import { Link } from "react-router";
import { IconBox, type MoniconIconBoxProps } from "../primitives/IconBox";
import { Button, type ButtonProps } from "../primitives/button";
import { getElementList } from "../primitives/for";

type SearchFormProps = Pick<ButtonProps, "size" | "theme" | "variant"> & {
	buttonIcon?: MoniconIconBoxProps["icon"];

	classNames?: {
		base?: string;
		btn?: string;
		container?: string;
		dropDown?: string;
		input?: string;
	};

	isSearchShow?: boolean;
	placeholder?: string;
	text?: string;
	type?: "search" | "subscribe";
};

function SearchForm(props: SearchFormProps) {
	const {
		buttonIcon = "bx:search-alt-2",
		classNames,
		isSearchShow,
		type = "search",
		placeholder = type === "search" ? "Search for products..." : "Enter Your Email address...",
		text,
		theme = "secondary",
		variant = "input",
	} = props;

	const { allProductsArray } = useGetAllProducts();

	const isMobile = useGlobalStore((state) => state.isMobile);

	const { data, query, setQuery } = useSearch(allProductsArray, 500);

	useEffect(() => {
		if (!isSearchShow) {
			setQuery("");
		}
	}, [isSearchShow, setQuery]);

	const [SearchItemsList] = getElementList();

	const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

	return (
		<div className={cnMerge("flex justify-center", classNames?.container)}>
			<form
				className={cnMerge(
					"flex w-full items-center",
					type === "search" && "z-[100]",
					classNames?.base
				)}
			>
				<input
					className={cnMerge(
						`w-full rounded-[2.5rem_0_0_2.5rem] border-y-2 border-l-2 border-secondary
						bg-[--color-body,_white] py-[0.6rem] pl-[2.3rem] transition-[box-shadow] duration-200
						placeholder:font-[500] placeholder:text-placeholder
						focus-within:shadow-[1px_0_10px_2px_var(--color-secondary)]
						max-sm:placeholder:text-[1.4rem]`,
						classNames?.input
					)}
					type={type === "search" ? "search" : "email"}
					name={type}
					placeholder={placeholder}
					value={type === "search" ? query : undefined}
					onChange={type === "search" ? handleQuery : undefined}
				/>
				<Button
					type="button"
					className={cnMerge(
						`h-full min-w-[6rem] p-0 text-[1.8rem] transition-[colors,scale] duration-300
						hover:bg-primary hover:text-heading active:scale-[1.08]`,
						classNames?.btn
					)}
					variant={variant}
					theme={theme}
				>
					{text ?? <IconBox icon={buttonIcon} />}
				</Button>
			</form>

			{type === "search" && data.length > 0 && query !== "" && (
				<SearchItemsList
					className={cnMerge(
						`custom-scrollbar absolute top-[14rem] z-[100] flex max-h-[50rem] w-[min(100%,_40rem)]
						flex-col gap-[1rem] overflow-y-auto rounded-[1rem] bg-body p-[2rem] text-[1.2rem]`,
						isMobile && "inset-x-0 mx-auto",
						!isMobile && "top-[8.1rem]"
					)}
					each={data}
					render={(item, index) => (
						<li key={item?.id ?? index}>
							<Link
								to={`/products/${item?.category}/${item?.id}`}
								className="flex items-center rounded-[5px] p-[1rem]
									box-shadow-[0_1px_10px_hsl(0,0%,0%,0.6)] lg:p-[1.6rem]"
							>
								<img
									className="aspect-square w-[5rem] rounded-full object-cover"
									src={item?.images[0]}
									width="64"
									alt=""
								/>
								<div className="ml-[1rem] font-medium">{item?.title}</div>

								<div className="ml-auto font-semibold">${item?.price}</div>
							</Link>
						</li>
					)}
				/>
			)}
		</div>
	);
}

export { SearchForm };
