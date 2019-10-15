import React, { Component } from "react";
import { IProduct, products } from "./ProductData";
import { Link, RouteComponentProps } from "react-router-dom";

type State = {
  products: IProduct[];
  search: string;
};

interface Props {
  [key: string]: any;
}

class ProductsPage extends Component<RouteComponentProps, State> {
  state: State = {
    products: [],
    search: ""
  };
  componentDidMount() {
    this.setState({ products });
  }
  render() {
    const {
      location: { search: param }
    } = this.props;
    const query = new URLSearchParams(param).get("search") || null;
    const sProduct = query
      ? products.find(product =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
      : null;
    return (
      <div className="page-container">
        <p>
          Welcome to React Shop where you can get all your tools for ReactJS
        </p>
        <ul className="product-list">
          {!sProduct ? (
            this.state.products.map(product => (
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

export default ProductsPage;
