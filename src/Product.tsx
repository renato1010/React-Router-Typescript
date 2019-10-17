import React from "react";
import { IProduct } from "./ProductData";
import Tabs from "./Tabs";
import withLoader from "./withLoader";

interface IProps {
  product?: IProduct;
  inBasket: boolean;
  onAddToBasket: () => void;
}

const Product: React.FC<IProps> = props => {
  if (!props.product) {
    return null;
  }
  const {
    product: { name, description, price, reviews },
    inBasket: added,
    onAddToBasket
  } = props;
  return (
    <>
      <h1>{name}</h1>
      <Tabs>
        <Tabs.Tab
          heading={() => <b>Description</b>}
          name="Description"
          initialActive={true}
        >
          <p>{description}</p>
        </Tabs.Tab>
        <Tabs.Tab name="Reviews" heading={() => "Reviews"}>
          <ul className="product-reviews">
            {reviews.map(review => (
              <li key={review.reviewer} className="product-reviews-item">
                <i>"{review.comment}"</i> - {review.reviewer}
              </li>
            ))}
          </ul>
        </Tabs.Tab>
      </Tabs>
      <p className="product-price">
        {new Intl.NumberFormat("en-US", {
          currency: "USD",
          style: "currency"
        }).format(price)}
      </p>
      {!added && <button onClick={onAddToBasket}>Add to Basket</button>}
    </>
  );
};

export default withLoader(Product);
