import { ApiData, IProduct, IShopProductItem, ShopName } from '../api-types'
import data from './data.json'

function transformData(items: any): ApiData {
	const productMap = items.eqlts.reduce(
		(
			products: Record<string, IProduct>,
			{
				title,
				prices,
				producers,
				links,
				images = [],
			}: { title: string; prices: number[]; producers: string[]; links: string[]; images: string[] }
		) => {
			prices.forEach((price, index) => {
				const label = [title, price, producers[index], links[index]].join(':')
				products[label] = {
					title,
					price,
					producer: producers[index],
					link: links[index],
					image: images[index],
				}
			})

			return products
		},
		{}
	)

	const products: IProduct[] = Object.values(productMap)

	const [head, ...tail] = products
	let minPrice = head.price
	let maxPrice = head.price
	const producers = new Set([head.producer])

	tail.forEach(({ price, producer }) => {
		producers.add(producer)
		minPrice = Math.min(minPrice, price)
		maxPrice = Math.max(maxPrice, price)
	})

	return {
		products,
		minPrice,
		maxPrice,
		producers: Array.from(producers),
	}
}

export const fakeProducts = transformData(data)

function randomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min) + min)
}

function generateShopItem(amount: number): IShopProductItem[] {
	const shops = Object.values(ShopName)

	return new Array(amount).fill(0).map((_, index) => {
		return {
			shopName: shops[index],
			price: Number(`${randomInt(20, 30)}.${randomInt(0, 100)}`),
			link: 'url',
		}
	})
}

// export const filterConfigs: FilterConfigs = {
// 	producers: [
// 		{
// 			id: 1,
// 			label: 'Art foods',
// 		},
// 		{
// 			id: 2,
// 			label: 'Терра',
// 		},
// 		{
// 			id: 3,
// 			label: 'Culinaro',
// 		},
// 		{
// 			id: 4,
// 			label: 'Zdorovo',
// 		},
// 		{
// 			id: 5,
// 			label: 'Август',
// 		},
// 	],
// }
