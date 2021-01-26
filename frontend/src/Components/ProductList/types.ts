import { IProduct } from '../../Data/api-types'

export interface IListProps {
	data: IProduct[]
	itemOnClick: (product: IProduct) => void
}

export interface IListItemProps {
	key: string
	data: IProduct
	itemOnClick: (product: IProduct) => void
}
