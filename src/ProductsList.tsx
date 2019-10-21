import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "./ProductsData";
import withLoader from "./withLoader";

type Props = {
  products?: IProduct[];
  search?: string | null;
  sProduct?: IProduct | null;
};

const ProductsList: React.FC<Props> = props => {
  const {sProduct, products } = props;
  return (
    <ul className="product-list">
      {!sProduct ? (
        products && products.length ? (
          products.map(product => (
            <li key={product.id} className="product-list-item">
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </li>
          ))
        ) : null
      ) : (
        <li key={sProduct.id} className="product-list-item">
          <Link to={`/products/${sProduct.id}`}>{sProduct.name}</Link>
        </li>
      )}
    </ul>
  );
};

export default withLoader(ProductsList);
