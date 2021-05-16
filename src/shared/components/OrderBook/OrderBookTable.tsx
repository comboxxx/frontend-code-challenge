import React from "react";
import { TOrderBookStream, TOrder } from "../../../order-book-stream";
import {
  SubTableColumn,
  SubTableRow,
  OrderBookDivider,
} from "../../styles/OrderBook.style";
import { FlexContainer } from "../../styles/sharedStyles";
import { mainGreen, mainRed } from "../../defaultValues";
import getFormatCurrency from "../../functions/getFormatCurrency";

const OrderBookTable: React.FC<TOrderBookStream> = ({ buy, sell }) => {
  return (
    <FlexContainer
      style={{
        marginTop: 7,
        borderRadius: 3,
        backgroundColor: "#48494d",
        padding: 5,
        paddingTop: 2,
      }}
    >
      <div style={{ flex: 6 }}>
        <SubTable rows={buy} position="left" transactionType="Buy" />
      </div>
      <div style={{ flex: 6 }}>
        <SubTable rows={sell} position="right" transactionType="Sell" />
      </div>
    </FlexContainer>
  );
};

type TTableRows = {
  rows: TOrder[];
  position: string;
  transactionType: string;
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const SubTable: React.FC<TTableRows> = ({
  rows,
  position,
  transactionType,
}) => {
  return (
    <div style={{ flex: 6 }}>
      <ColumnHeader position={position} transactionType={transactionType} />
      <OrderBookDivider />
      {rows.map((row: TOrder, idx: number) => {
        return (
          <SubTableRow
            position={position}
            fontSize="13px"
            lineHeight="1.5"
            transactionPercent={getRandomInt(70).toString()}
            key={`row_${idx}`}
          >
            <SubTableColumn color="white" position={position}>
              {getFormatCurrency(row.amount, 4)}
            </SubTableColumn>
            <SubTableColumn
              color={position === "left" ? mainGreen : mainRed}
              style={{
                textAlign: "center",
              }}
            >
              {getFormatCurrency(row.price, 2)}
            </SubTableColumn>
          </SubTableRow>
        );
      })}
    </div>
  );
};

type TColumnHeader = {
  position: string;
  transactionType: string;
};

const ColumnHeader: React.FC<TColumnHeader> = ({
  position,
  transactionType,
}) => {
  return (
    <SubTableRow color="lightgray" fontWeight="bold" position={position}>
      <SubTableColumn position={position}>Amount</SubTableColumn>
      <SubTableColumn
        color="white"
        style={{
          textAlign: "center",
        }}
      >
        {transactionType}
      </SubTableColumn>
    </SubTableRow>
  );
};

export default OrderBookTable;
