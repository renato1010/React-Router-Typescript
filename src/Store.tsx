import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./ProductsReducer";
import { ProductsState } from "./ProductsTypes";
import { BasketState } from "./BasketTypes";
import { basketReducer } from "./BasketReducer";

export interface IApplicationState {
  products: ProductsState;
  basket: BasketState;
}

const rootReducer = combineReducers<IApplicationState>({
  products: productsReducer,
  basket: basketReducer
});

export default function configureStore(): Store<IApplicationState> {
  return createStore(rootReducer, undefined, applyMiddleware(thunk));
}
