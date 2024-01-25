import { useGlobalActions } from "@/store/zustand/globalStore/globalStore";
import { RiMenu3Fill } from "react-icons/ri";

function HamBurgerButton() {
	const { toggleNavShow } = useGlobalActions();

	return (
		<button id="Hamburger" className={"w-[2.6rem]"} onClick={toggleNavShow}>
			<RiMenu3Fill />
		</button>
	);
}
export default HamBurgerButton;
