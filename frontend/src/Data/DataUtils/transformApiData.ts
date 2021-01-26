import { IProduct } from '../api-types'

export function transformApiData(products: IProduct[]): IProduct[] {
	return products.map(({ prices, ...restOptions }) => {
		return {
			...restOptions,
			prices: prices.map((price) => Number.parseFloat(price as any) || 0),
		}
	})
}
