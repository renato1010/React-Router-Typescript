import { ActionCreator, AnyAction, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { getProducts as getProductsFromAPI } from "./ProductsData";
import {
  IProductsGetAllAction,
  IProductsLoadingAction,
  ProductsState,
  ProductsActionsTypes
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
