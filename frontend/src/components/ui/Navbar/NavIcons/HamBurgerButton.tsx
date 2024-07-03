import { IconBox } from "@/components/primitives/IconBox";
import { useGlobalActions } from "@/store/zustand/globalStore";

function HamBurgerButton() {
	const { toggleNavShow } = useGlobalActions();

	return (
		<button id="Hamburger" className={"w-[2.6rem]"} onClick={toggleNavShow}>
			<IconBox icon="ri:menu-3-fill" />
		</button>
	);
}
export default HamBurgerButton;
