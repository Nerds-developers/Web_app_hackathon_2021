import { FilterParams, IProduct } from '../api-types'
import { min, max } from 'lodash'
export function buildFilterParams(products: IProduct[]): Omit<FilterParams, 'selectedProducers'> {
	if (products.length === 0) {
		return { minPrice: 0, maxPrice: 0, producers: [] }
	}
	const [head, ...tail] = products

	let minPrice = min(head.prices) || 0
	let maxPrice = max(head.prices) || 0
	const producers = new Set([head.producer])

	tail.forEach(({ prices, producer }) => {
		producers.add(producer)
		minPrice = Math.min(minPrice, min(prices) as number)
		maxPrice = Math.max(maxPrice, max(prices) as number)
	})

	return {
		minPrice,
		maxPrice,
		producers: Array.from(producers),
	}
}
