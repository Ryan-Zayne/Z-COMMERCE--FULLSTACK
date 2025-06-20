import { cnMerge } from "@/lib/utils/cn";
import { useScrollObserver } from "@zayne-labs/toolkit-react";
import { IconBox } from "../primitives/IconBox";
import { Button } from "../primitives/button";

function ScrollToTopButton() {
	const { isScrolled, observedElementRef } = useScrollObserver<HTMLDivElement>({
		rootMargin: "1000px 0px 0px",
	});

	return (
		<div
			ref={observedElementRef}
			className="fixed bottom-[20px] right-[20px] z-[500]"
			onClick={() => window.scrollTo(0, 0)}
		>
			<Button
				unstyled={true}
				className={cnMerge(
					`flex aspect-square w-[40px] items-center justify-center
					rounded-[62%_38%_46%_54%/60%_63%_37%_40%] bg-secondary text-[20px] text-dark
					transition-[translate,scale] duration-[400ms] [scale:0] [translate:0_-5000%]`,
					[isScrolled && "duration-[1.2s] ease-in-out [scale:1] [translate:0_0]"]
				)}
			>
				<IconBox icon="bi:chevron-up" />
			</Button>
		</div>
	);
}

export { ScrollToTopButton };
