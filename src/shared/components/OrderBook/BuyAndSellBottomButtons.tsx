import React from "react";
import { Button } from "react-bootstrap";
import { TSetModalVisible } from "../../models/ModalModel";
import {
  BuyAndSellBottomButtonsCard,
  BuyAndSellBottomButtonsContainer,
} from "../../styles/OrderBook.style";
import { FlexColumn, FlexContainer } from "../../styles/sharedStyles";

type TBuyAndSellBottomButtons = {
  openOrderModal: TSetModalVisible;
};
const BuyAndSellBottomButtons: React.FC<TBuyAndSellBottomButtons> = ({
  openOrderModal,
}) => {
  const handleOpenBuyModal = () => {
    openOrderModal("buy");
  };
  const handleOpenSellModal = () => {
    openOrderModal("sell");
  };

  return (
    <BuyAndSellBottomButtonsContainer>
      <BuyAndSellBottomButtonsCard>
        <FlexContainer>
          <FlexColumn style={{ marginRight: 5 }}>
            <Button
              variant="info"
              style={{ width: "100%" }}
              onClick={handleOpenBuyModal}
              id="open_buy_order_modal_button"
            >
              + Buy
            </Button>
          </FlexColumn>
          <FlexColumn style={{ marginLeft: 5 }}>
            <Button
              variant="danger"
              style={{ width: "100%" }}
              onClick={handleOpenSellModal}
              id="open_sell_order_modal_button"
            >
              - Sell
            </Button>
          </FlexColumn>
        </FlexContainer>
      </BuyAndSellBottomButtonsCard>
    </BuyAndSellBottomButtonsContainer>
  );
};

export default BuyAndSellBottomButtons;
