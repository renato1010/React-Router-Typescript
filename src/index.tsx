import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Store } from "redux";
import configureStore, { IApplicationState } from "./Store";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Routes from "./Routes";

type AppProps = {
  store: Store<IApplicationState>;
};
const Root: React.FC<AppProps> = props => {
  return (
    <Provider store={props.store}>
      <Routes />
    </Provider>
  );
};

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
