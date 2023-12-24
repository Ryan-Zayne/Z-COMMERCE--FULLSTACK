import { ImageComponent } from '@/components/primitives/index.ts';
import { Carousel, type CarouselProviderProps } from '@/components/ui/index.ts';
import { useElementList } from '@/lib/hooks/index.ts';
import { BsChevronRight } from 'react-icons/bs';

type ItemHeroProps = {
	slideImages: Extract<CarouselProviderProps['slideImages'], string[]>;
};

function ItemHero({ slideImages }: ItemHeroProps) {
	const { For: ItemList } = useElementList();
	const { For: IndicatorList } = useElementList();

	return (
		<article className="h-[35rem] w-[min(100%,50rem)] max-md:mx-auto md:h-full">
			<Carousel.Root slideImages={slideImages}>
				<Carousel.Content
					as="div"
					arrowIcon={<BsChevronRight />}
					innerClassName={
						'rounded-[0.7rem] max-lg:dark:[box-shadow:0_0_3px_0.1px_var(--carousel-dot)]'
					}
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
				</Carousel.Content>
			</Carousel.Root>
		</article>
	);
}

export default ItemHero;
