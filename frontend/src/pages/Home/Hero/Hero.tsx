import { Button, Carousel, ImageComponent } from '@/components';
import type { CarouselStore } from '@/components/Carousel/carousel.types';
import { useCarouselStore } from '@/components/Carousel/carouselStoreContext';
import { useAnimateCarouselRefs, useElementList } from '@/hooks';
import { RxPaperPlane } from 'react-icons/rx';

function Hero() {
	const slideImages = useCarouselStore(
		(state) => state.slideImages as Exclude<CarouselStore['slideImages'], string[]>
	);

	const { animatedElements, handleElementsAnimation } = useAnimateCarouselRefs();
	const { For: ItemList } = useElementList();
	const { For: IndicatorList } = useElementList();

	return (
		<section id="Hero">
			<Carousel
				onButtonClick={handleElementsAnimation}
				outerClassName={'mx-[1rem] h-[38rem] md:h-[41.4rem] lg:h-[48.5rem]'}
				innerClassName={'rounded-[0.7rem] dark:box-shadow-[0_0_7px_-1px_hsl(0,0%,40%,0.6)]'}
				leftBtnClasses={
					'md:left-[0.8rem] hover:box-shadow-[0_0_5px_var(--text-dark)] lg:left-[29.5rem] p-[0.8rem_0.5rem] lg:p-[1.3rem_0.9rem]'
				}
				rightBtnClasses={
					'hover:box-shadow-[0_0_5px_var(--text-dark)] md:right-[0.8rem] lg:right-[2rem] p-[0.8rem_0.5rem] lg:p-[1.3rem_0.9rem]'
				}
				arrowIcon={<RxPaperPlane className="lg:text-[1.7rem]" />}
				autoSlideInterval={12000}
				hasAutoSlide={true}
				pauseOnHover={true}
			>
				<Carousel.ItemWrapper className={'brightness-[0.6]'}>
					<ItemList
						each={slideImages}
						render={(image, index) => (
							<Carousel.Item key={image.src}>
								<ImageComponent
									className={'h-full w-full'}
									imageType={'hasFallback'}
									src={image.src}
									blurSrc={image.blurSrc}
									fetchpriority={index === 0 ? 'high' : 'auto'}
								/>
							</Carousel.Item>
						)}
					/>
				</Carousel.ItemWrapper>

				<Carousel.Caption
					className={
						'ml-[4.5rem] mt-[5.5rem] flex flex-col items-start md:ml-[7.5rem] lg:ml-[36rem] lg:mt-[8rem]'
					}
				>
					<h1
						ref={(elem) => (animatedElements.heading = elem)}
						className="w-[17ch] font-roboto text-[clamp(2rem,_4vw+1rem,_3rem)] font-600 text-heading"
					>
						Explore the Future of Technology
					</h1>

					<p
						ref={(elem) => (animatedElements.paragraph = elem)}
						className="z-20 w-[30ch] text-[clamp(1.3rem,_1vw+1rem,_1.7rem)] [margin-block:1.8rem_3.7rem]"
					>
						Discover the Latest and most Exquisite Tech Products for Your Home, Office, and On-the-go
						Needs.
					</p>

					<Button
						ref={(elem) => (animatedElements.button = elem)}
						text={'Shop Now'}
						theme={'secondary'}
						className="z-50 text-[clamp(1.3rem,_1vw+1rem,_1.7rem)] font-[600] transition-shadow duration-[400ms] hover:[box-shadow:0_10px_20px_hsl(43,100%,55%,0.4)] active:scale-[1.04] max-sm:p-[1rem_2.8rem]"
					/>
				</Carousel.Caption>

				<Carousel.IndicatorWrapper>
					<IndicatorList
						each={slideImages}
						render={(image, index) => <Carousel.Indicator key={image.src} index={index} />}
					/>
				</Carousel.IndicatorWrapper>
			</Carousel>
		</section>
	);
}

export default Hero;
