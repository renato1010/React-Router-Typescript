import { IProduct } from "./ProductsData";

export interface IProductsLoadingAction {
  type: ProductsActionsTypes.LOADING;
}
export interface IProductsGetAllAction {
  type: ProductsActionsTypes.GETALL;
  products: IProduct[];
}
export interface IProductsGetSingleAction {
  type: ProductsActionsTypes.GETSINGLE;
  product: IProduct;
}
export type ProductsActions =
  | IProductsGetAllAction
  | IProductsLoadingAction
  | IProductsGetSingleAction;

export enum ProductsActionsTypes {
  GETALL = "PRODUCTS/GETALL",
  LOADING = "PRODUCTS/LOADING",
  GETSINGLE = "PRODUCTS/GETSINGLE"
}

interface IProductsState {
  products: IProduct[];
  productsLoading: boolean;
  currentProduct: IProduct | null;
}

export type ProductsState = Readonly<IProductsState>;
