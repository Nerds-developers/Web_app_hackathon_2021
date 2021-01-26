import { IProduct, SortingParams } from '../api-types'
import { sortBy, mean } from 'lodash'

export function sortProducts(products: IProduct[], { column, order }: SortingParams) {
	const picker = (product: any) => {
		return Array.isArray(product[column]) ? mean(product[column]) : product[column]
	}
	return order === 'asc' ? sortBy(products, picker) : sortBy(products, picker).reverse()
}
