import React, { Component } from "react";
import { RouteComponentProps, Prompt } from "react-router-dom";
import { connect } from "react-redux";
import { IProduct } from "./ProductsData";
import Product from "./Product";
import { addToBasket } from "./BasketActions";
import { IApplicationState } from "./Store";
import { getProduct } from "./ProductsActions";

type Props = RouteComponentProps<{ id: string }> & {
  addToBasket: typeof addToBasket;
  getProduct: typeof getProduct;
  loading: boolean;
  product?: IProduct;
  added: boolean;
};

class ProductPage extends Component<Props> {
  private componentUnloaded: boolean = false;

  componentDidMount() {
    if (this.props.match.params.id) {
      const id: number = parseInt(this.props.match.params.id, 10);
      this.props.getProduct(id);
    }
  }

  componentWillUnmount() {
    this.componentUnloaded = true;
  }

  handleAddClick = () => {
    !!this.props.product && this.props.addToBasket(this.props.product);
  };

  render() {
    const { product, loading, added } = this.props;
    return (
      <div className="page-container">
        <Prompt
          when={!added}
          message="Are you sure you leave without buying this product"
        />
        {product || loading ? (
          <Product
            product={product}
            inBasket={added}
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    addToBasket: (product: IProduct) => dispatch(addToBasket(product)),
    getProduct: (id: number) => dispatch(getProduct(id))
  };
};

const mapStateToProps = (store: IApplicationState) => {
  return {
    added: store.basket.products.some(p =>
      store.products.currentProduct
        ? p.id === store.products.currentProduct.id
        : false
    ),
    loading: store.products.productsLoading,
    product: store.products.currentProduct || undefined
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPage);
