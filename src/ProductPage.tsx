import React, { Component } from "react";
import { RouteComponentProps, Prompt } from "react-router-dom";
import { IProduct, getProduct } from "./ProductsData";
import Product from "./Product";


type Props = RouteComponentProps<{ id: string }>;
type State = {
  product?: IProduct;
  added: boolean;
  loading: boolean;
};

class ProductPage extends Component<Props, State> {
  state: State = { added: false, product: undefined, loading: true };

  private componentUnloaded: boolean = false;

  async componentDidMount() {
    if (this.props.match.params.id) {
      const id: number = parseInt(this.props.match.params.id, 10);
      const product = await getProduct(id);
      if (product !== null && !this.componentUnloaded) {
        this.setState({ product, loading: false });
      }
    }
  }

  componentWillUnmount() {
    this.componentUnloaded = true;
  }

  handleAddClick = () => {
    this.setState({ added: true });
  };

  render() {
    const { product, loading } = this.state;
    return (
      <div className="page-container">
        <Prompt
          when={!this.state.added}
          message="Are you sure you leave without buying this product"
        />
        {product || loading ? (
          <Product
            product={product}
            inBasket={this.state.added}
            onAddToBasket={this.handleAddClick}
            loading={loading}
          />
        ) : (
          <p>Product not found!</p>
        )}
      </div>
    );
  }
}

export default ProductPage;
