import React, { useEffect, useState } from "react";
import "./App.css";
import OrderModal, { TOrderForm } from "./OrderModal";
import OrderBook from "./OrderBook";
import orderBookStream, {
  TCoinCurrentPrice,
  TOrderBookStream,
  mockCurrentPrice,
  TSide,
} from "./order-book-stream";
import zipmex from "./zipmex.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { TModalVisible } from "./shared/models/ModalModel";
function App() {
  const [orderBook, setOrderBook] = useState<TOrderBookStream>({
    buy: [],
    sell: [],
  });
  const [orderModalVisible, setOrderModalVisible] =
    useState<TModalVisible>(false);
  const [currentSide, setCurrentSide] = useState<TSide>("buy");
  const [coinCurrentPrice, setCoinCurrentPrice] = useState<TCoinCurrentPrice>(
    mockCurrentPrice.increment
  );

  useEffect(() => {
    orderBookStream.subscribe((data, currentPrice) => {
      setOrderBook(data);
      setCoinCurrentPrice(currentPrice);
    });
  }, []);

  const handleSubmitOrder: TOrderForm["submitOrder"] = (
    side,
    { price, amount }
  ) => {
    orderBookStream.addOrder(side, { price, amount });
  };

  const handleOpenOrderModal = (side: TSide) => {
    setCurrentSide(side);
    setOrderModalVisible(true);
  };

  return (
    <div className="App">
      {orderModalVisible && (
        <OrderModal
          id="order_modal"
          visible={orderModalVisible}
          setVisible={setOrderModalVisible}
          submitOrder={handleSubmitOrder}
          coinAbbreviations={"ZMT"}
          coinName={"Zipmex Token"}
          logo={zipmex}
          side={currentSide}
          coinCurrentPrice={coinCurrentPrice}
        />
      )}
      <OrderBook
        id="order_book"
        buy={orderBook.buy}
        sell={orderBook.sell}
        currentPrice={coinCurrentPrice}
        openOrderModal={handleOpenOrderModal}
        coinAbbreviations={"ZMT"}
        coinName={"Zipmex Token"}
        logo={zipmex}
      />
    </div>
  );
}

export default App;
