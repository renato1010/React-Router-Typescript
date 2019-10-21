import { IProduct } from "./ProductsData";

export enum BasketActionTypes {
  ADD = "BASKET/ADD"
}

interface IBasketState {
  products: IProduct[];
}

export type BasketState = Readonly<IBasketState>;

export interface IBasketAdd {
  type: BasketActionTypes.ADD;
  product: IProduct;
}
export type BasketActions = IBasketAdd;
