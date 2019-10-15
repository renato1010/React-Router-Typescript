import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import AdminPage from "./AdminPage";
import ProductsPage from "./ProductsPage";
import Header from "./Header";
import ProductPage from "./ProductPage";
import NotFoundPage from "./NotFoundPage";
import LoginPage from "./LoginPage";

const Routes: React.FC = () => {
  const [loggedIn] = React.useState(false);
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Redirect exact from="/" to="/products" />
          <Route exact path="/products" component={ProductsPage} />
          <Route path="/products/:id" component={ProductPage} />
          <Route path="/login" component={LoginPage} />
          <Route
            path="/admin"
            render={routeProps => {
              return loggedIn ? (
                <AdminPage {...routeProps} title="My Admmin Panel" />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
