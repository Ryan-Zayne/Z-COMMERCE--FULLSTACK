import FooterDropDowns from './FooterDropDowns.tsx';
import FooterHeaderSection from './FooterHeaderSection.tsx';

function Footer() {
	return (
		<footer className="flex flex-col pt-[7rem] lg:pt-[9rem] [&_li:hover]:text-secondary [&_li]:cursor-pointer">
			<FooterHeaderSection />

			<FooterDropDowns />

			<section className="bg-primary py-[2rem] text-center text-[1.4rem] font-[300] italic text-light">
				<p>Copyright © {new Date().getFullYear()} DigitalGenie</p>
			</section>
		</footer>
	);
}

export default Footer;
