import { BasketState, BasketActions, BasketActionTypes } from "./BasketTypes";
import { Reducer } from "redux";

const initailBasketState: BasketState = {
  products: []
};

export const basketReducer: Reducer<BasketState, BasketActions> = (
  state = initailBasketState,
  action
) => {
  switch (action.type) {
    case BasketActionTypes.ADD: {
      return {
        ...state,
        products: [...state.products, action.product]
      };
    }
  }
  return state;
};
