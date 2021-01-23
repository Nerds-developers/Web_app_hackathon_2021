export type Shop = 'atb' | 'silpo' | 'metro'

export interface IProduct {
  id: number;
  name: string;
  producer: string;
  price: number;
  image: string;
  shop: Shop
  link: string
}

export interface IProducer {
  label: string,
  id: number
}

export type FilterConfigs = {
  producers: IProducer[]
}
