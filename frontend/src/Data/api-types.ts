export enum ShopName {
	METRO = 'metro',
	NOVUS = 'novus',
	AUCHAN = 'auchan',
}

export interface IProducer {
	label: string
	id: number
}

export type FilterConfigs = {
	producers: IProducer[]
}

export interface IShopProductItem {
	shopName: string
	price: number
	link: string
}

export interface IProduct {
	id: number
	name: string
	producer: string
	image: string
	shopItems: IShopProductItem[]
}

export type SortingParams = {
	order?: 'asc' | 'desc'
	column?: string
}

export type FilterParams = {
	selectedProducers: string[]
	price: { min: number; max: number }
}

export type QueryParams = {
	sorting: SortingParams
	filters: FilterParams
}
