import { IProduct } from "./ProductsData";

export interface IProductsLoadingAction {
  type: ProductsActionsTypes.LOADING;
}
export interface IProductsGetAllAction {
  type: ProductsActionsTypes.GETALL;
  products: IProduct[];
}
export type ProductsActions = IProductsGetAllAction | IProductsLoadingAction;

export enum ProductsActionsTypes {
  GETALL = "PRODUCTS/GETALL",
  LOADING = "PRODUCTS/LOADING"
}

interface IProductsState {
  products: IProduct[];
  productsLoading: boolean;
}

export type ProductsState = Readonly<IProductsState>;
