import { useToggle } from "@/lib/hooks/useToggle";
import { cnMerge } from "@/lib/utils/cn";
import { IconBox } from "./IconBox";

export type InputProps = React.ComponentPropsWithRef<"input">;

function Input(props: InputProps) {
	const { className, type, id, ...restOfProps } = props;

	const [isPasswordVisible, toggleVisibility] = useToggle(false);

	return (
		<>
			<input
				type={type === "password" && isPasswordVisible ? "text" : type}
				id={id}
				className={cnMerge(
					`flex w-full rounded-md border border-shadcn-input px-3 py-2 text-sm file:border-0
					file:bg-transparent placeholder:text-muted-foreground focus-visible:outline-none
					focus-visible:ring-2 focus-visible:ring-shadcn-ring disabled:cursor-not-allowed
					disabled:opacity-50`,
					className
				)}
				{...restOfProps}
			/>

			{type === "password" && (
				<button type="button" onClick={toggleVisibility}>
					<IconBox
						icon={
							isPasswordVisible
								? "material-symbols:visibility-outline-rounded"
								: "material-symbols:visibility-off-outline-rounded"
						}
						className="size-5 lg:size-6"
					/>
				</button>
			)}
		</>
	);
}

export default Input;
