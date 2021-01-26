import { FilterParams, IProduct, QueryParams } from './api-types'
import { buildFilterParams } from './DataUtils/buildFilterParams'
import { paginateProducts } from './DataUtils/paginateProducts'
import { sortProducts } from './DataUtils/sortProducts'
import { filterProducts } from './DataUtils/filterProducts'
import axios from 'axios'
import data from './Mocks/data.json'
import { transformApiData } from './DataUtils/transformApiData'

export default class ApiClient {
	constructor(protected readonly url: string) {}

	async fetchProducts(
		queryParams: QueryParams,
		isProduction: boolean
	): Promise<[IProduct[], FilterParams]> {
		try {
			let products = transformApiData(await this.fetchData(isProduction))

			const filterParams = buildFilterParams(products)
			filterParams.selectedMaxPrice = queryParams.filters?.selectedMaxPrice
			filterParams.selectedMinPrice = queryParams.filters?.selectedMinPrice

			if (queryParams.filters) {
				products = filterProducts(products, queryParams.filters)
			}

			if (queryParams.sorting) {
				products = sortProducts(products, queryParams.sorting)
			}

			const { producers: selectedProducers } = buildFilterParams(products)

			if (queryParams.page) {
				products = paginateProducts(products, queryParams.page)
			}

			return [products, { ...filterParams, selectedProducers }]
		} catch (e) {
			console.error(e)

			return [[], { selectedProducers: [], producers: [], maxPrice: 0, minPrice: 0 }]
		}
	}

	private async fetchData(isProduction: boolean): Promise<IProduct[]> {
		return isProduction
			? (await axios.get<IProduct[]>(`${this.url}/api/grechka`)).data
			: ((data as any) as IProduct[])
	}
}
