import React, { Component } from "react";
import { RouteComponentProps, Prompt } from "react-router-dom";
import { IProduct, products } from "./ProductData";
import Product from "./Product";

type Props = RouteComponentProps<{ id: string }>;
type State = { product?: IProduct; added: boolean };

class ProductPage extends Component<Props, State> {
  state: State = { added: false, product: undefined };

  componentDidMount() {
    if (this.props.match.params.id) {
      const id: number = parseInt(this.props.match.params.id, 10);
      const product = products.find(product => product.id === id);
      this.setState({ product });
    }
  }

  handleAddClick = () => {
    this.setState({ added: true });
  };

  render() {
    const { product } = this.state;
    return (
      <div className="page-container">
        <Prompt
          when={!this.state.added}
          message="Are you sure you leave without buying this product"
        />
        {product ? (
          <Product
            product={product}
            inBasket={this.state.added}
            onAddToBasket={this.handleAddClick}
          />
        ) : (
          <p>Product not found!</p>
        )}
      </div>
    );
  }
}

export default ProductPage;
