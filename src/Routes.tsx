import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  RouteComponentProps
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ProductsPage from "./ProductsPage";
import Header from "./Header";
import ProductPage from "./ProductPage";
import NotFoundPage from "./NotFoundPage";
import LoginPage from "./LoginPage";

const AdminPage = React.lazy(() => import("./AdminPage"));

const RoutesWrap: React.FC = () => {
  return (
    <Router>
      <Route component={Routes} />
    </Router>
  );
};

const Routes: React.FC<RouteComponentProps> = ({ location }) => {
  const [loggedIn] = React.useState(true);
  return (
    <div>
      <Header />
      <TransitionGroup>
        <CSSTransition key={location.key} timeout={200} classNames="animate">
          <Switch>
            <Redirect exact from="/" to="/products" />
            <Route exact path="/products" component={ProductsPage} />
            <Route path="/products/:id" component={ProductPage} />
            <Route path="/login" component={LoginPage} />
            <Route
              path="/admin"
              render={routeProps => {
                return loggedIn ? (
                  <Suspense
                    fallback={<div className="page-container">Loding...</div>}
                  >
                    <AdminPage {...routeProps} title="My Admmin Panel" />
                  </Suspense>
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default RoutesWrap;
