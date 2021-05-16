import { TCoinCurrentPrice, TOrder } from "./order-book-stream";
import { Container, Divider } from "./shared/styles/OrderBook.style";
import CoinHeader from "./shared/components/OrderBook/CoinHeader";
import React from "react";
import CurrentPriceCard from "./shared/components/OrderBook/CurrentPriceCard";
import OrderBookTable from "./shared/components/OrderBook/OrderBookTable";
import BuyAndSellBottomButtons from "./shared/components/OrderBook/BuyAndSellBottomButtons";
import { TCoinHeader } from "./shared/models/CoinInfo";
import { TSetModalVisible } from "./shared/models/ModalModel";

type OrderBookPageData = {
  buy: TOrder[];
  sell: TOrder[];
  currentPrice: TCoinCurrentPrice;
  openOrderModal: TSetModalVisible;
} & TCoinHeader &
  React.HTMLAttributes<HTMLDivElement>;
const OrderBook: React.FC<OrderBookPageData> = ({
  buy,
  sell,
  currentPrice,
  openOrderModal,
  coinName,
  coinAbbreviations,
  logo,
}) => {
  return (
    <div>
      <Container>
        <CoinHeader
          coinName={coinName}
          coinAbbreviations={coinAbbreviations}
          logo={logo}
        />
        <Divider />
        <CurrentPriceCard {...currentPrice} />
        <OrderBookTable buy={buy} sell={sell} />
      </Container>

      <BuyAndSellBottomButtons openOrderModal={openOrderModal} />
    </div>
  );
};

export default OrderBook;
