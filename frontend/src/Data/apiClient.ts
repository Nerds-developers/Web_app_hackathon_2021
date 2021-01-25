import { fakeProducts } from './Mocks'
import { ApiData, FilterParams, IProduct, QueryParams, SortingParams } from './api-types'
import { sortBy } from 'lodash'

export default class ApiClient {
	fetchProducts(queryParams: QueryParams): Promise<ApiData> {
		console.log(JSON.stringify(queryParams))
		return new Promise<ApiData>((resolve) => {
			setTimeout(() => {
				const { products, ...rest } = fakeProducts
				const filteredProducts = queryParams.filters
					? this.filterResponseData(products, queryParams.filters)
					: products
				const selectedProducts: IProduct[] = this.paginateArray(
					this.sortResponse(filteredProducts, queryParams.sorting),
					queryParams.page
				)

				resolve({ ...rest, products: selectedProducts })
			}, 10)
		})
	}

	filterResponseData(
		products: IProduct[],
		{ producers: selectedProducers, maxPrice, minPrice }: FilterParams
	) {
		return products.filter(({ price, producer }) => {
			return selectedProducers.includes(producer) && price >= minPrice && price <= maxPrice
		})
	}

	sortResponse(products: IProduct[], { column, order }: SortingParams) {
		return order === 'asc' ? sortBy(products, column) : sortBy(products, column).reverse()
	}

	paginateArray(products: IProduct[], page: number, perPage: number = 10) {
		return products.slice((page - 1) * perPage, page * perPage)
	}

	// fetchFilterConfigs(): Promise<FilterConfigs> {
	// 	return new Promise<FilterConfigs>((resolve) => {
	// 		setTimeout(() => resolve(filterConfigs), 100)
	// 	})
	// }
}
