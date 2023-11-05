import { Carousel, ImageComponent } from '@/components';
import type { CarouselStore } from '@/components/Carousel/carousel.types';
import { useCarouselStore } from '@/components/Carousel/carouselStoreContext';
import { useElementList } from '@/hooks';
import { useThemeStore } from '@/store/zustand/themeStore';
import { BsChevronRight } from 'react-icons/bs';
import { twJoin } from 'tailwind-merge';

function ItemHero() {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const slideImages = useCarouselStore(
		(state) => state.slideImages as Extract<CarouselStore['slideImages'], string[]>
	);

	const { For: ItemList } = useElementList();
	const { For: IndicatorList } = useElementList();

	return (
		<article className="h-[35rem] w-[min(100%,50rem)] max-md:mx-auto md:h-full">
			<Carousel
				as="div"
				innerClassName={twJoin(
					`rounded-[0.7rem]`,
					isDarkMode && 'max-lg:[box-shadow:0_0_3px_0.1px_var(--carousel-dot)]'
				)}
				arrowIcon={<BsChevronRight />}
				leftBtnClasses={'p-[0.7rem_0.4rem] text-[1.7rem] md:text-[2rem] '}
				rightBtnClasses={'p-[0.7rem_0.4rem] text-[1.7rem] md:text-[2rem]'}
			>
				<Carousel.ItemWrapper className={'brightness-[0.65]'}>
					<ItemList
						each={slideImages}
						render={(image) => (
							<Carousel.Item key={image}>
								<ImageComponent imageType={'hasSkeleton'} src={image} />
							</Carousel.Item>
						)}
					/>
				</Carousel.ItemWrapper>

				<Carousel.IndicatorWrapper>
					<IndicatorList
						each={slideImages}
						render={(image, index) => (
							<Carousel.Indicator
								key={image}
								index={index}
								className={
									'bg-[hsl(198,14%,14%)] hover:bg-[hsl(220,62%,31%)] hover:box-shadow-[0_0_5px_hsl(220,62%,31%)]'
								}
								onActiveClassName={'p-[0.4rem] w-[0.6rem] bg-[hsl(220,62%,31%)]'}
							/>
						)}
					/>
				</Carousel.IndicatorWrapper>
			</Carousel>
		</article>
	);
}

export default ItemHero;
