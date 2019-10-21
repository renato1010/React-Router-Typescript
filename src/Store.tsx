import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./ProductsReducer";
import { ProductsState } from "./ProductsTypes";

export interface IApplicationState {
  products: ProductsState;
}

const rootReducer = combineReducers<IApplicationState>({
  products: productsReducer
});

export default function configureStore(): Store<IApplicationState> {
  return createStore(rootReducer, undefined, applyMiddleware(thunk));
}
