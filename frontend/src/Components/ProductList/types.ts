import { IProduct } from '../../Data/api-types'

export interface IListProps {
	data: IProduct[]
}

export interface IListItemProps {
	key: string
	data: IProduct
}