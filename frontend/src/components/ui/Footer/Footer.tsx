import { FooterDropDowns } from "./FooterDropDowns";
import { FooterHeaderSection } from "./FooterHeaderSection";

function Footer() {
	return (
		<footer
			className="flex flex-col pt-[70px] lg:pt-[90px] [&_li:hover]:text-secondary [&_li]:cursor-pointer"
		>
			<FooterHeaderSection />

			<FooterDropDowns />

			<section className="bg-primary py-[20px] text-center text-[14px] font-[300] italic text-light">
				<p>Copyright 2023 DigitalGenie</p>
			</section>
		</footer>
	);
}

export { Footer };
