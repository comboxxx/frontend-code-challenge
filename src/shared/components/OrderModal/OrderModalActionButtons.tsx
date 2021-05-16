import React, { MouseEventHandler } from "react";
import { TSide } from "../../../order-book-stream";
import {
  FlexColumn,
  FlexContainer,
  FullWidthButton,
} from "../../styles/sharedStyles";

type TOrderModalActionButtons = {
  side: TSide;
  onClose: MouseEventHandler<HTMLElement>;
};

const OrderModalActionButtons: React.FC<TOrderModalActionButtons> = ({
  side,
  onClose,
}) => {
  return (
    <FlexContainer>
      <FlexColumn>
        <FullWidthButton
          variant="secondary"
          onClick={onClose}
          id="close_order_modal_button"
        >
          Cancel
        </FullWidthButton>
      </FlexColumn>
      <FlexColumn flex="6" style={{ marginLeft: 5 }}>
        <FullWidthButton
          variant={side === "buy" ? "info" : "danger"}
          type="submit"
          id="place_order_button"
        >
          Place order
        </FullWidthButton>
      </FlexColumn>
    </FlexContainer>
  );
};

export default OrderModalActionButtons;
