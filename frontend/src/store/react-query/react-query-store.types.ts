export type DummyResponseData = {
	products: Array<{
		brand: string;
		category: string;
		description: string;
		id: number;
		images: string[];
		price: number;
		rating: number;
		stock: number;
		thumbnail: string;
		title: string;
	}>;
};

export type DummyResponseDataItem = DummyResponseData["products"][number];
