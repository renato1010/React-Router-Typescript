import React from "react";

type Props = { count: number };

const BasketSummary: React.FC<Props> = ({ count }) => {
  return <div className="basket-summary">{count}</div>;
};

export default BasketSummary;
