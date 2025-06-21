import { useAnimateElementRefs } from "@zayne-labs/toolkit-react";
import { Button } from "@/components/primitives/button";
import { IconBox } from "@/components/primitives/IconBox";
import { ImageComponent } from "@/components/primitives/ImageComponent";
import { Carousel } from "@/components/ui/carousel";
import { slideImages } from "./images";

function Hero() {
	const { animatedElements, handleElementsAnimation } = useAnimateElementRefs([
		{
			animationClass: "animate-fade-in-down",
			targetElement: "heading",
		},
		{
			animationClass: "animate-fade-in-up",
			targetElement: "button",
		},
		{
			animationClass: "animate-fade-in-up-2",
			targetElement: "paragraph",
		},
	]);

	return (
		<section id="Hero">
			<Carousel.Root images={slideImages} onSlideBtnClick={handleElementsAnimation}>
				<Carousel.Content
					classNames={{
						base: "mx-[10px] h-[330px] md:h-[414px] lg:h-[485px]",
						scrollContainer: "rounded-[7px] dark:box-shadow-[0_0_7px_-1px_hsl(0,0%,40%,0.6)]",
					}}
					autoSlideInterval={8000}
					hasAutoSlide={true}
					shouldPauseOnHover={true}
				>
					<Carousel.Controls
						classNames={{
							base: "px-[7px] md:px-[8px] lg:pl-[300px] lg:pr-[20px]",
							iconContainer: `rounded-[5px] bg-carousel-btn p-[8px_5px]
							hover:box-shadow-[0_0_5px_var(--text-dark)] lg:p-[13px_9px]`,
						}}
						icon={{
							icon: <IconBox icon="radix-icons:paper-plane" className="lg:text-[20px]" />,
							iconType: "nextIcon",
						}}
					/>

					<Carousel.ItemGroup<(typeof slideImages)[number]>
						render={(image) => (
							<Carousel.Item key={image.src} className="brightness-[0.6]">
								<ImageComponent
									className="size-full"
									imageType="hasFallback"
									src={image.src}
									blurSrc={image.blurSrc}
									fetchPriority="high"
								/>
							</Carousel.Item>
						)}
					/>

					<Carousel.Caption
						className="ml-[45px] mt-[37px] flex flex-col items-start text-light md:ml-[75px]
							lg:ml-[360px] lg:mt-[80px]"
					>
						<h1
							ref={(elem) => {
								animatedElements.heading = elem;
							}}
							className="w-[17ch] font-roboto text-[clamp(20px,4vw+10px,30px)] font-600
								text-heading"
						>
							Explore the Future of Technology
						</h1>

						<p
							ref={(elem) => {
								animatedElements.paragraph = elem;
							}}
							className="z-20 w-[30ch] text-[clamp(13px,1vw+10px,17px)] [margin-block:10px_30px]
								md:[margin-block:18px_37px] lg:w-[40ch] lg:text-[clamp(15px,1vw+10px,20px)]"
						>
							Discover the Latest and most Exquisite Tech Products for Your Home, Office, and
							On-the-go Needs.
						</p>

						<Button
							ref={(elem) => {
								animatedElements.button = elem;
							}}
							theme="secondary"
							className="z-50 text-[clamp(13px,1vw+10px,17px)] font-[600] transition-shadow
								duration-[400ms] hover:[box-shadow:0_10px_20px_hsl(43,100%,55%,0.4)]
								active:scale-[1.04] max-sm:p-[10px_28px]"
						>
							Shop Now
						</Button>
					</Carousel.Caption>

					<Carousel.IndicatorGroup<(typeof slideImages)[number]>
						render={(image, index) => (
							<Carousel.Indicator
								key={image.src}
								currentIndex={index}
								classNames={{
									base: `bg-carousel-btn hover:bg-carousel-dot
									hover:[box-shadow:0_0_5px_var(--carousel-dot)]`,
									isActive: "bg-carousel-dot",
								}}
							/>
						)}
					/>
				</Carousel.Content>
			</Carousel.Root>
		</section>
	);
}

export default Hero;
