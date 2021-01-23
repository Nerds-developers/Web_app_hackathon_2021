import {IProduct, Shop} from "../api-types";
import {FilterConfigs} from "../api-types";

export const fakeProducts = [
    ...generateProduct(3, 'atb'),
    ...generateProduct(3, 'silpo'),
    ...generateProduct(2, 'metro'),
]

function generateProduct(count: number, shop: Shop): IProduct[] {
    return new Array(count).fill(null).map((_, index) => {
        return {
            id: index + 1,
            name: `Греча ${index + 1}`,
            price: Number(`${randomInt(20, 30)}.${randomInt(0, 100)}`),
            producer: `Завод ${index + 1}`,
            image: "https://material-ui.com/static/images/grid-list/camera.jpg",
            link: "https://material-ui.com/static/images/grid-list/camera.jpg",
            shop: shop
        };
    });
}

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}


export const filterConfigs: FilterConfigs = {
    producers: [
        {
            id: 1,
            label: 'Art foods'
        },
        {
            id: 2,
            label: 'Терра'
        },
        {
            id: 3,
            label: 'Culinaro'
        },
        {
            id: 4,
            label: 'Zdorovo'
        },
        {
            id: 5,
            label: 'Август'
        }
    ]
}
