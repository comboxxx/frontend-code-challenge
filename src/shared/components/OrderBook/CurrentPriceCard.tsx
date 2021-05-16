import React from "react";
import { TCoinCurrentPrice } from "../../../order-book-stream";
import { CurrentPriceCardContainer } from "../../styles/OrderBook.style";

const CurrentPriceCard: React.FC<TCoinCurrentPrice> = (props) => {
  const { price, mode } = props;
  return (
    <CurrentPriceCardContainer mode={mode}>
      ${price.toLocaleString()} {mode === "increment" ? "▲" : "▼"}
    </CurrentPriceCardContainer>
  );
};

export default CurrentPriceCard;
