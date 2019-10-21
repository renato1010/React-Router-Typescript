import { Reducer } from "redux";
import {
  ProductsState,
  ProductsActions,
  ProductsActionsTypes
} from "./ProductsTypes";

const initialProductState: ProductsState = {
  products: [],
  productsLoading: false,
  currentProduct: null
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
    case ProductsActionsTypes.GETSINGLE: {
      return {
        ...state,
        currentProduct: action.product,
        productsLoading: false
      };
    }
  }
  return state;
};
