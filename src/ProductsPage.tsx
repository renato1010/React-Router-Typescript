import React, { Component } from "react";
import { connect } from "react-redux";
import { IProduct } from "./ProductsData";
import { Link, RouteComponentProps } from "react-router-dom";
import { IApplicationState } from "./Store";
import { getProducts } from "./ProductsActions";

interface Props extends RouteComponentProps {
  getProducts: typeof getProducts;
  loading: boolean;
  products: IProduct[];
}

class ProductsPage extends Component<Props> {
  async componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const {
      location: { search: param }
    } = this.props;
    const search = new URLSearchParams(param).get("search");
    const sProduct = search
      ? this.props.products.find(prod =>
          prod.name.toLowerCase().includes(search)
        )
      : null;
    return (
      <div className="page-container">
        <p>
          Welcome to React Shop where you can get all your tools for ReactJS
        </p>
        <ul className="product-list">
          {!sProduct ? (
            this.props.products.map(product => (
              <li key={product.id} className="product-list-item">
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </li>
            ))
          ) : (
            <li key={sProduct.id} className="product-list-item">
              <Link to={`/products/${sProduct.id}`}>{sProduct.name}</Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (store: IApplicationState) => {
  return {
    loading: store.products.productsLoading,
    products: store.products.products
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getProducts: () => dispatch(getProducts())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPage);
