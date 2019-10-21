import React, { useReducer } from "react";
import { IProduct } from "./ProductsData";
import Tabs from "./Tabs";
import withLoader from "./withLoader";

type Props = {
  product?: IProduct;
  inBasket: boolean;
  onAddToBasket: () => void;
};

type LikeState = { likes: number; lastLike: Date | null };

const initialLikeState: LikeState = {
  likes: 0,
  lastLike: null
};

/* types for the action */
enum LikeActionTypes {
  LIKE = "LIKE"
}

type LikeAction = {
  type: LikeActionTypes.LIKE;
  now: Date;
};

type LikeActions = LikeAction;

/* Likes Reducer */
const reducer = (state = initialLikeState, action: LikeActions) => {
  switch (action.type) {
    case LikeActionTypes.LIKE: {
      return { ...state, likes: state.likes + 1, lastLike: action.now };
    }
    default:
      return state;
  }
};

const Product: React.FC<Props> = props => {
  const [{ likes, lastLike }, dispatch]: [
    LikeState,
    (action: LikeAction) => void
  ] = useReducer(reducer, initialLikeState);
  if (!props.product) {
    return null;
  }
  const handleLikeClick = () => {
    dispatch({ type: LikeActionTypes.LIKE, now: new Date() });
  };
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
      <div className="like-container">
        {likes > 0 && <div>{`I like thisx ${likes}, last at ${lastLike}`}</div>}
        <button onClick={handleLikeClick}>
          {likes > 0 ? "Like again" : "Like"}
        </button>
      </div>
    </>
  );
};

export default withLoader(Product);
