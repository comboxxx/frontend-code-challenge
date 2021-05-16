import React from "react";
import { TSide } from "../../../order-book-stream";
import { mainGreen, mainRed } from "../../defaultValues";
import getFormatCurrency from "../../functions/getFormatCurrency";
import getOrderAmount from "../../functions/getOrderAmount";
import { TOrderFormData } from "../../models/ModalModel";

type TBuyOrSellAmountSummayText = {
  side: TSide;
  orderDetail: TOrderFormData;
  coinAbbreviations: string;
};

const BuyOrSellAmountSummayText: React.FC<TBuyOrSellAmountSummayText> = ({
  side,
  orderDetail,
  coinAbbreviations,
}) => {
  let buyOrSellAmount = getOrderAmount(orderDetail);

  return (
    <div
      style={{
        marginTop: 16,
        color: side === "buy" ? mainGreen : mainRed,
        fontSize: 20,
      }}
    >
      You will {side === "buy" ? "receive" : "sell"}{" "}
      {getFormatCurrency(buyOrSellAmount, 5)} {coinAbbreviations}
    </div>
  );
};

export default BuyOrSellAmountSummayText;
