import { IProduct, SortingParams } from '../api-types'
import { sortBy, mean } from 'lodash'

export function sortProducts(products: IProduct[], { column, order }: SortingParams) {
	const picker = (product: any) => {
		console.log('price', Array.isArray(product[column]) ? mean(product[column]) : product[column])
		console.log(product[column])
		return Array.isArray(product[column]) ? mean(product[column]) : product[column]
	}
	return order === 'asc' ? sortBy(products, picker) : sortBy(products, picker).reverse()
}
