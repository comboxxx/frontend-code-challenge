import faker from "faker";
import compareByNumber from "./shared/functions/compareByNumber";
export type TOrderBookStream = {
  buy: TOrder[];
  sell: TOrder[];
};

export type TOrder = {
  price: string;
  amount: string;
};

export type TSide = "buy" | "sell";

type TOrderBookFunction = (
  orderBook: TOrderBookStream,
  currentPrice: TCoinCurrentPrice
) => void;

export type TCoinCurrentPrice = {
  price: number;
  mode: string; // Increment, Decrement
};

type TmockCurrentPrice = {
  increment: TCoinCurrentPrice;
  decrement: TCoinCurrentPrice;
};

export const mockCurrentPrice: TmockCurrentPrice = {
  increment: {
    price: 501.23,
    mode: "increment",
  },
  decrement: {
    price: 499.74,
    mode: "decrement",
  },
};

class OrderBookStream {
  intervalId: number;
  subscribers: TOrderBookFunction[] = [];
  intervalRate = 2000;
  currentData: TOrderBookStream;
  userOrder: TOrderBookStream = {
    buy: [],
    sell: [],
  };
  //MOCK CURRENT PRICE
  currentPrice: TCoinCurrentPrice = mockCurrentPrice.increment;

  constructor() {
    this.currentData = this.produceData();
    this.intervalId = window.setInterval(() => {
      this.subscribers.forEach((callback) => {
        this.currentData = this.produceData();

        //SWITCH BETWEEN INCREMENT AND DECREMENT
        if (this.currentPrice.mode === "increment")
          this.currentPrice = mockCurrentPrice.decrement;
        else this.currentPrice = mockCurrentPrice.increment;

        callback(this.currentData, this.currentPrice); //SEND MOCK CURRENT PRICE
      });
    }, this.intervalRate);
  }

  addOrder(side: TSide, order: TOrder) {
    this.userOrder[side].push(order);
    // //SORT BUY DESC
    // if (side === "buy") {
    //   this.userOrder["buy"] = sortOrderDESC([...this.userOrder["buy"], order]);
    // }
    // //SORT SELL ASC
    // else {
    //   this.userOrder["sell"] = sortOrderASC([...this.userOrder["sell"], order]);
    // }
  }

  produceData(): TOrderBookStream {
    let mockDataLength: number = 20;

    const buy: TOrder[] = Array.from({ length: mockDataLength }, () => {
      return {
        price: faker.finance.amount(490.12, 499.1, 2),
        amount: faker.finance.amount(0, 45, 4),
      };
    });

    const sell: TOrder[] = Array.from({ length: mockDataLength }, () => {
      return {
        price: faker.finance.amount(499.3, 508.5, 2),
        amount: faker.finance.amount(0, 45, 4),
      };
    });

    //SORT BUY DESC
    const sortedBuy = sortOrderDESC(buy);
    //SORT SELL ASC
    const sortedSell = sortOrderASC(sell);

    return {
      buy: sortedBuy.concat(this.userOrder.buy),
      sell: sortedSell.concat(this.userOrder.sell),
    };
  }

  subscribe(callback: TOrderBookFunction) {
    this.subscribers.push(callback);
    callback(this.currentData, this.currentPrice);
    return () => {
      const index = this.subscribers.findIndex(
        (subscriber: TOrderBookFunction) => {
          return subscriber === callback;
        }
      );
      this.unSubscribe(index);
    };
  }

  unSubscribe(unSubscribeIndex: number) {
    this.subscribers = this.subscribers.filter(
      (_, index) => index !== unSubscribeIndex
    );
  }

  destroy() {
    window.clearInterval(this.intervalId);
    this.subscribers = [];
  }
}

const sortOrderDESC = (orders: TOrder[]) => {
  let _orders: TOrder[] = orders.sort((firstEl, secondEl) =>
    compareByNumber(secondEl.price, firstEl.price)
  );
  return _orders;
};

const sortOrderASC = (orders: TOrder[]) => {
  let _orders: TOrder[] = orders.sort((firstEl, secondEl) =>
    compareByNumber(firstEl.price, secondEl.price)
  );
  return _orders;
};

export default new OrderBookStream();
