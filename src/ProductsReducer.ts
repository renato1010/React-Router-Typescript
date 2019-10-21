import { Reducer } from "redux";
import {
  ProductsState,
  ProductsActions,
  ProductsActionsTypes
} from "./ProductsTypes";

const initialProductState: ProductsState = {
  products: [],
  productsLoading: false
};

export const productsReducer: Reducer<ProductsState, ProductsActions> = (
  state = initialProductState,
  action
) => {
  switch (action.type) {
    case ProductsActionsTypes.LOADING: {
      return {
        ...state,
        productsLoading: true
      };
    }
    case ProductsActionsTypes.GETALL: {
      return {
        ...state,
        products: action.products,
        productsLoading: false
      };
    }
  }
  return state;
};
