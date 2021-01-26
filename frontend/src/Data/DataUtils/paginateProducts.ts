import { IProduct } from '../api-types'
import { PRODUCT_PER_PAGE } from '../../constants'

export function paginateProducts(
	products: IProduct[],
	page: number,
	perPage: number = PRODUCT_PER_PAGE
) {
	return products.slice((page - 1) * perPage, page * perPage)
}
