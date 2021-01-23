import { fakeProducts, filterConfigs } from "./Mocks";
import {IProduct} from "./api-types";
import {FilterConfigs} from "./api-types";

export default class ApiClient {

  fetchProducts (filters?: Record<string, string>): Promise<IProduct[]> {
    return Promise.resolve(fakeProducts);
  }

  fetchFilterConfigs (): Promise<FilterConfigs> {
    return new Promise<FilterConfigs>((resolve) => {
      setTimeout(() => resolve(filterConfigs), 2000)
    })
  }
}
