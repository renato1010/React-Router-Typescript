import React, { Component } from "react";
import { RouteComponentProps, Prompt } from "react-router-dom";
import { IProduct, products } from "./ProductData";

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
          <>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p className="product-price">
              {new Intl.NumberFormat("en-US", {
                currency: "USD",
                style: "currency"
              }).format(product.price)}
            </p>
            {!this.state.added && (
              <button onClick={this.handleAddClick}>Add to Basket</button>
            )}
          </>
        ) : (
          <p>Product not found!</p>
        )}
      </div>
    );
  }
}

export default ProductPage;
