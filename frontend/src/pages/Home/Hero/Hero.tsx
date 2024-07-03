import { Button, ImageComponent } from "@/components/primitives";
import { IconBox } from "@/components/primitives/IconBox";
import { Carousel } from "@/components/ui";
import { useAnimateElementRefs } from "@/lib/hooks";
import { slideImages } from "./images";

function Hero() {
	const { animatedElements, handleElementsAnimation } = useAnimateElementRefs();

	return (
		<section id="Hero">
			<Carousel.Root images={slideImages} onSlideBtnClick={handleElementsAnimation}>
				<Carousel.Content
					classNames={{
						base: "mx-[1rem] h-[33rem] md:h-[41.4rem] lg:h-[48.5rem]",
						scrollContainer: "rounded-[0.7rem] dark:box-shadow-[0_0_7px_-1px_hsl(0,0%,40%,0.6)]",
					}}
					autoSlideInterval={8000}
					hasAutoSlide={true}
					shouldPauseOnHover={true}
				>
					<Carousel.Controls
						classNames={{
							base: "px-[0.7rem] md:px-[0.8rem] lg:pl-[30rem] lg:pr-[2rem]",
							iconContainer: `rounded-[5px] bg-carousel-btn p-[0.8rem_0.5rem]
							hover:box-shadow-[0_0_5px_var(--text-dark)] lg:p-[1.3rem_0.9rem]`,
						}}
						icon={{
							iconType: "nextIcon",
							icon: <IconBox icon="radix-icons:paper-plane" className="lg:text-[1.7rem]" />,
						}}
					/>

					<Carousel.ItemWrapper<(typeof slideImages)[number]>
						render={(image) => (
							<Carousel.Item key={image.src} className="brightness-[0.6]">
								<ImageComponent
									className={"size-full"}
									imageType={"hasFallback"}
									src={image.src}
									blurSrc={image.blurSrc}
									fetchpriority={"high"}
								/>
							</Carousel.Item>
						)}
					/>

					<Carousel.Caption
						className="ml-[4.5rem] mt-[3.7rem] flex flex-col items-start text-light md:ml-[7.5rem]
							lg:ml-[36rem] lg:mt-[8rem]"
					>
						<h1
							ref={(elem) => (animatedElements.heading = elem)}
							className="w-[17ch] font-roboto text-[clamp(2rem,_4vw+1rem,_3rem)] font-600
								text-heading"
						>
							Explore the Future of Technology
						</h1>

						<p
							ref={(elem) => (animatedElements.paragraph = elem)}
							className="z-20 w-[30ch] text-[clamp(1.3rem,_1vw+1rem,_1.7rem)]
								[margin-block:1rem_3rem] md:[margin-block:1.8rem_3.7rem] lg:w-[40ch]
								lg:text-[clamp(1.5rem,_1vw+1rem,_2rem)]"
						>
							Discover the Latest and most Exquisite Tech Products for Your Home, Office, and
							On-the-go Needs.
						</p>

						<Button
							ref={(elem) => (animatedElements.button = elem)}
							text={"Shop Now"}
							theme={"secondary"}
							className="z-50 text-[clamp(1.3rem,_1vw+1rem,_1.7rem)] font-[600] transition-shadow
								duration-[400ms] hover:[box-shadow:0_10px_20px_hsl(43,100%,55%,0.4)]
								active:scale-[1.04] max-sm:p-[1rem_2.8rem]"
						/>
					</Carousel.Caption>

					<Carousel.IndicatorWrapper<(typeof slideImages)[number]>
						render={(image, index) => <Carousel.Indicator key={image.src} currentIndex={index} />}
					/>
				</Carousel.Content>
			</Carousel.Root>
		</section>
	);
}

export default Hero;
