import { IProduct } from "./ProductsData";
import { IBasketAdd, BasketActionTypes } from "./BasketTypes";

export const addToBasket = (product: IProduct): IBasketAdd => ({
  product,
  type: BasketActionTypes.ADD
});
