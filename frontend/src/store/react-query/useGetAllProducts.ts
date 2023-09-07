import { fetcher } from '@/api/fetcher';
import { transformData } from '@/store/react-query/helpers/transFormData';
import { useFetchMultiple } from './useFetch';

const useGetAllProducts = () => {
	const productQueries = [
		{ key: ['smartphones'], url: 'products/category/smartphones' },
		{ key: ['laptops'], url: 'products/category/laptops' },
		{ key: ['mens-watches'], url: 'products/category/mens-watches' },
		{ key: ['womens-watches'], url: 'products/category/womens-watches' },
		{ key: ['automotive'], url: 'products/category/automotive' },
		{ key: ['motorcycle'], url: 'products/category/motorcycle' },
		{ key: ['lighting'], url: 'products/category/lighting' },
	];

	const allProducts = useFetchMultiple(
		productQueries.map((queryItem) => ({
			queryKey: queryItem.key,
			queryFn: () => fetcher(queryItem.url),
			select: transformData,
		}))
	);

	const isLoading = allProducts.some((item) => item.isLoading);

	const isError = allProducts.some((item) => item.isError);

	const allProductsArray = allProducts
		.flatMap((item) => item.data)
		.filter((product) => product?.id !== 3); // Filtered out 3rd product cuz it's faulty

	return { isLoading, isError, allProductsArray };
};

export { useGetAllProducts };
