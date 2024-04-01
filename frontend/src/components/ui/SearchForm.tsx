import { Button, type ButtonProps } from "@/components/primitives";
import { useElementList } from "@/lib/hooks";
import { useSearch } from "@/lib/hooks/useSearch";
import { cnMerge } from "@/lib/utils/cn";
import { useGetAllProducts } from "@/store/react-query/useGetAllProducts";
import type { IconType } from "react-icons";
import { BiSearchAlt2 } from "react-icons/bi";
import { Link } from "react-router-dom";

type SearchFormProps = Pick<ButtonProps, "theme" | "variant" | "size" | "text"> & {
	classNames?: {
		baseContainer?: string;
		form?: string;
		btn?: string;
		input?: string;
	};

	buttonIcon?: IconType;
	placeholder?: string;
	type?: "search" | "subscribe";
	"z-index"?: `z-[${number}]`;
};

function SearchForm(props: SearchFormProps) {
	const {
		type = "search",
		classNames,
		buttonIcon: ButtonIcon = BiSearchAlt2,
		theme = "secondary",
		variant = "input",
		placeholder = type === "search" ? "Search for products..." : "Enter Your Email address...",
		"z-index": zIndex = "z-[100]",
		text,
	} = props;

	const { allProductsArray } = useGetAllProducts();

	const { query, setQuery, filtered } = useSearch(allProductsArray, 500);

	const [SearchItemsList] = useElementList();

	return (
		<div className={cnMerge("flex flex-col", classNames?.baseContainer)}>
			<form className={cnMerge("flex items-center", type === "search" && zIndex, classNames?.form)}>
				<input
					className={cnMerge(
						`w-full rounded-[2.5rem_0_0_2.5rem] border-secondary bg-[--color-body,_white] py-[0.6rem] pl-[2.3rem] transition-[box-shadow] duration-200 [border-width:2px_0_2px_2px] placeholder:font-[500] placeholder:text-placeholder focus-within:shadow-[1px_0_10px_2px_var(--color-secondary)] max-sm:placeholder:text-[1.4rem]`,
						[classNames?.input]
					)}
					type={type === "search" ? "search" : "email"}
					name={type}
					placeholder={placeholder}
					value={type === "search" ? query : undefined}
					onChange={type === "search" ? (e) => setQuery(e.target.value) : undefined}
				/>

				<Button
					type="button"
					className={cnMerge(
						`px-[2.1rem] text-[1.8rem] transition-[colors,scale] duration-300 hover:bg-primary hover:text-heading active:scale-[1.08]`,
						classNames?.btn
					)}
					variant={variant}
					theme={theme}
				>
					{text ?? <ButtonIcon />}
				</Button>
			</form>

			{type === "search" && filtered.length > 0 && query !== "" && (
				<div className="custom-scrollbar absolute inset-x-0 top-[14.2rem] z-[120] flex justify-center overflow-y-auto">
					<SearchItemsList
						className="flex w-[min(100%,_40rem)] flex-col gap-[1rem] bg-body px-[1.3rem] pt-[2rem] text-[1.2rem] lg:px-[2rem]"
						each={filtered}
						render={(item, index) => (
							<li key={item?.id ?? index}>
								<Link
									to={`/products/${item?.category}/${item?.id}`}
									className="flex items-center rounded-[5px] p-[1rem] box-shadow-[0_1px_10px_hsl(0,0%,0%,0.6)] lg:p-[1.6rem] "
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
				</div>
			)}
		</div>
	);
}

export default SearchForm;
