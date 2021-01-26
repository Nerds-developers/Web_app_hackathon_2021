export enum ShopName {
	METRO = 'metro',
	NOVUS = 'novus',
	AUCHAN = 'auchan',
}

export interface IProducer {
	label: string
	id: number
}

export interface IShopProductItem {
	shopName: string
	price: number
	link: string
}

export interface IProduct {
	title: string
	producer: string
	image_link: string
	links: string[]
	prices: number[]
}

export type SortingParams = {
	order: 'asc' | 'desc'
	column: string
}

export type FilterParams = {
	producers: string[]
	selectedProducers: string[]
	selectedMinPrice?: number
	selectedMaxPrice?: number
	minPrice: number
	maxPrice: number
}

export type QueryParams = {
	sorting?: SortingParams
	filters?: FilterParams
	page?: number
}

export type ApiData = {
	products: IProduct[]
	minPrice: number
	maxPrice: number
	producers: string[]
}
