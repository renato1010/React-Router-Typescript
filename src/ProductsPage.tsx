import React, { Component } from "react";
import { IProduct, products } from "./ProductData";
import { Link } from "react-router-dom";

type State = {
  products: IProduct[];
};

class ProductsPage extends Component<{}, State> {
  state: State = {
    products: []
  };
  componentDidMount() {
    this.setState({ products });
  }
  render() {
    console.log("products: ", this.state.products);
    return (
      <div className="page-container">
        <p>
          Welcome to React Shop where you can get all your tools for ReactJS
        </p>
        <ul className="product-list">
          {this.state.products.map(product => (
            <li key={product.id} className="product-list-item">
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ProductsPage;
