import ProductCard from '@/components/ui/ProductCard.tsx';
import { useElementList } from '@/hooks/useElementList.ts';
import { assertDefined } from '@/lib/global-type-helpers.ts';
import type { DataArrayProp } from './home-product.types.ts';

function SimilarProducts({ data }: DataArrayProp) {
	const { For: ProductCardsList } = useElementList();

	return (
		<article id="Similar Products You Might Like" className="flex flex-col gap-[3rem] px-[3rem]">
			<h2 className="text-[2.5rem] font-[700] max-md:text-center lg:text-[3rem]">
				Similar Products You Might Like
			</h2>

			<ul className="grid grid-cols-[repeat(auto-fit,_minmax(min(100%,23.6rem),_1fr))] justify-items-center gap-[3rem_1.5rem]">
				<ProductCardsList
					each={data}
					render={(product) => (
						<ProductCard
							key={product?.id}
							to={`/products/${product?.category}/${product?.id}`}
							image={product?.images[1] ?? ''}
							productItem={assertDefined(product)}
						/>
					)}
				/>
			</ul>
		</article>
	);
}
export default SimilarProducts;
