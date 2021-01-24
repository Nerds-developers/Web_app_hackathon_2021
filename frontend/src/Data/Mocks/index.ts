import { IProduct, IShopProductItem, ShopName } from '../api-types'
import { FilterConfigs } from '../api-types'

export const fakeProducts = [...generateProduct(12)]

function generateProduct(count: number): IProduct[] {
	return new Array(count).fill(null).map((_, index) => {
		return {
			id: index + 1,
			name: `Греча ${index + 1}`,
			producer: `Завод ${index + 1}`,
			image: 'https://material-ui.com/static/images/grid-list/camera.jpg',
			shopItems: generateShopItem(randomInt(0, 4)),
		}
	})
}

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

export const filterConfigs: FilterConfigs = {
	producers: [
		{
			id: 1,
			label: 'Art foods',
		},
		{
			id: 2,
			label: 'Терра',
		},
		{
			id: 3,
			label: 'Culinaro',
		},
		{
			id: 4,
			label: 'Zdorovo',
		},
		{
			id: 5,
			label: 'Август',
		},
	],
}
