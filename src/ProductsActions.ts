import { ActionCreator, AnyAction, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  getProducts as getProductsFromAPI,
  getProduct as getProductFromAPI
} from "./ProductsData";
import {
  IProductsGetAllAction,
  IProductsLoadingAction,
  ProductsState,
  ProductsActionsTypes,
  IProductsGetSingleAction
} from "./ProductsTypes";

const loading: ActionCreator<IProductsLoadingAction> = () => ({
  type: ProductsActionsTypes.LOADING
});

export const getProducts: ActionCreator<
  ThunkAction<Promise<AnyAction>, ProductsState, null, IProductsGetAllAction>
> = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loading());
    const products = await getProductsFromAPI();
    return dispatch({
      products,
      type: ProductsActionsTypes.GETALL
    });
  };
};

export const getProduct: ActionCreator<
  ThunkAction<Promise<any>, ProductsState, null, IProductsGetSingleAction>
> = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(loading());
    const product = await getProductFromAPI(id);
    dispatch({ product, type: ProductsActionsTypes.GETSINGLE });
  };
};
