import { IconBox } from "@/components/primitives/IconBox";
import SearchForm from "@/components/ui/SearchForm";
import { m } from "framer-motion";
import { NewsletterIcon, getOnApple, getOnGoogle } from "./images";

function FooterHeaderSection() {
	return (
		<m.section
			initial={{ y: 100, opacity: 0 }}
			whileInView={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.7 }}
			viewport={{ margin: "-20px 0px 0px" }}
			className="flex flex-col bg-slate-900 bg-footer-image bg-cover bg-no-repeat p-[3rem_2rem]
				[background-position:center] lg:flex-row lg:justify-between lg:px-[clamp(3rem,9vw,18rem)]"
		>
			<div className="flex flex-col items-center gap-[1rem] lg:gap-[2.5rem]">
				<header className="flex items-center">
					<NewsletterIcon />

					<h4 className="text-[1.7rem] font-[500] text-heading lg:text-[2.4rem]">
						Sign Up For NewsLetter
					</h4>
				</header>

				<p className="text-[1.4rem] lg:text-[1.8rem]">$20 discount for your first order</p>

				<SearchForm
					type={"subscribe"}
					classNames={{
						base: "w-[min(100%,40rem)] lg:w-[45rem]",
						btn: "p-[0.91rem_1.5rem] text-[1.45rem] font-[500] lg:p-[1.2rem_2.6rem]",
						input: "lg:py-[0.9rem]",
					}}
					placeholder={"Enter Your Email address..."}
					text={"Subscribe"}
				/>

				<p className="text-[1.2rem] lg:text-[1.4rem]">Updates on promotions and coupons.</p>
			</div>

			<span className="block bg-carousel-btn max-lg:my-[3rem] max-lg:h-[1px] lg:w-[1px]" />

			<div className="flex flex-col items-center gap-[1rem] lg:gap-[2.5rem]">
				<h4 className="flex items-center text-[1.7rem] font-[500] text-heading lg:text-[2.4rem]">
					Download App On Mobile
				</h4>

				<p className="text-[1.4rem] lg:text-[1.8rem]">15% discount on your first purchase</p>

				<span className="flex gap-[0.5rem] lg:gap-[2rem]">
					<img
						className="h-[4.1rem] w-[14rem] lg:h-[5rem] lg:w-[17rem]"
						src={getOnGoogle}
						alt=""
						loading="lazy"
					/>
					<img
						className="h-[4.1rem] w-[14rem] lg:h-[5rem] lg:w-[17rem]"
						src={getOnApple}
						alt=""
						loading="lazy"
					/>
				</span>

				<span
					className="flex gap-[2rem] text-[2rem] [&_svg:hover]:text-secondary [&_svg]:cursor-pointer"
				>
					<IconBox icon="bi:facebook" />
					<IconBox icon="bi:twitter" />
					<IconBox icon="bi:youtube" />
					<IconBox icon="bi:instagram" />
					<IconBox icon="bi:pinterest" />
				</span>
			</div>
		</m.section>
	);
}

export default FooterHeaderSection;
