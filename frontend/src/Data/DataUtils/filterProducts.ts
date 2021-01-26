import { FilterParams, IProduct } from '../api-types'

export function filterProducts(
	products: IProduct[],
	{ selectedProducers, maxPrice, minPrice, selectedMinPrice, selectedMaxPrice }: FilterParams
) {
	const min: number = selectedMinPrice || minPrice
	const max: number = selectedMaxPrice || maxPrice

	return products.filter(({ prices, producer }) => {
		return (
			selectedProducers.includes(producer) &&
			prices.every((price) => price >= min) &&
			prices.every((price) => price <= max)
		)
	})
}
