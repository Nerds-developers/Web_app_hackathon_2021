import { IProduct, ShopName } from '../api-types'

function selectShopProducts(products: IProduct[], shopName: ShopName | 'all'): IProduct[] {
	if (shopName === 'all') {
		return products
	}

	return products.filter(({ shopItems }) => {
		return shopItems.some((shopItem) => shopItem.shopName === shopName)
	})
}

export default selectShopProducts
