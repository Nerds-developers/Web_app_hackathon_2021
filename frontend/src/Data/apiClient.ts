import { fakeProducts, filterConfigs } from './Mocks'
import { IProduct, QueryParams } from './api-types'
import { FilterConfigs } from './api-types'

export default class ApiClient {
	fetchProducts(queryParams?: QueryParams): Promise<IProduct[]> {
		alert(JSON.stringify(queryParams))
		return new Promise<IProduct[]>((resolve) => {
			setTimeout(() => resolve(fakeProducts), 200)
		})
	}

	fetchFilterConfigs(): Promise<FilterConfigs> {
		return new Promise<FilterConfigs>((resolve) => {
			setTimeout(() => resolve(filterConfigs), 100)
		})
	}
}
