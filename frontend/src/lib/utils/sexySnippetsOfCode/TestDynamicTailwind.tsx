import type { MyCustomCss } from "@/lib/type-helpers/global-type-helpers";

function TestDynamicTailwind() {
	const dynamicText = "blue"; // pretend this is dynamic
	const dynamicNumber = 45; // pretend this is dynamic

	return (
		<div
			className="w-[--dynamic-width] text-[--dynamic-color]"
			style={
				{
					"--dynamic-color": dynamicText,
					"--dynamic-width": `${dynamicNumber}rem`,
				} satisfies MyCustomCss as MyCustomCss
			}
		>
			<p>Hello World</p>
		</div>
	);
}

export default TestDynamicTailwind;
