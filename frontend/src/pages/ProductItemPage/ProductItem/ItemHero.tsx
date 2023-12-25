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
					classNames={{
						innerContainer: 'rounded-[0.7rem] dark:box-shadow-[0_0_7px_-1px_hsl(0,0%,40%,0.6)]',
						leftBtn:
							'md:left-[0.8rem] hover:box-shadow-[0_0_5px_var(--text-dark)] lg:left-[29.5rem] p-[0.8rem_0.5rem] lg:p-[1.3rem_0.9rem]',
						rightBtn:
							'hover:box-shadow-[0_0_5px_var(--text-dark)] md:right-[0.8rem] lg:right-[2rem] p-[0.8rem_0.5rem] lg:p-[1.3rem_0.9rem]',
					}}
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
									classNames={{
										onActive: 'p-[0.4rem] w-[0.6rem] bg-[hsl(220,62%,31%)]',
									}}
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
