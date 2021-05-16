import React, { MouseEventHandler, useState } from "react";
import { Form, FormControl, Modal } from "react-bootstrap";
import { TCoinCurrentPrice, TOrder, TSide } from "./order-book-stream";
import BuyOrSellAmountSummayText from "./shared/components/OrderModal/BuyOrSellAmountSummayText";
import OrderModalActionButtons from "./shared/components/OrderModal/OrderModalActionButtons";
import { CoinLogo } from "./shared/components/sharedComponents";
import "./shared/css/modalStyle.css";
import { mainGreen, mainRed } from "./shared/defaultValues";
import getOrderAmount from "./shared/functions/getOrderAmount";
import { TCoinHeader } from "./shared/models/CoinInfo";
import { TModalVisible, TOrderFormData } from "./shared/models/ModalModel";
import {
  DividerWhite,
  FlexContainerSpaceBetween,
} from "./shared/styles/sharedStyles";

//FOR SUBMIT ORDER
export type TOrderForm = {
  submitOrder: (side: TSide, { price, amount }: TOrder) => void;
};

//FOR MODAL
type TOrderModal = {
  visible: TModalVisible;
  side: TSide;
  setVisible: (visble: boolean) => void;
  coinCurrentPrice: TCoinCurrentPrice;
} & TCoinHeader &
  TOrderForm &
  React.HTMLAttributes<HTMLDivElement>;

const OrderModal: React.FC<TOrderModal> = ({
  submitOrder,
  visible,
  setVisible,
  coinAbbreviations,
  coinName,
  logo,
  side,
  coinCurrentPrice,
}) => {
  const onClose = () => setVisible(false);

  return (
    <Modal
      show={visible}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onClose}
      className="order_modal"
      id="order_modal"
    >
      <ModalHeader
        coinAbbreviations={coinAbbreviations}
        coinName={coinName}
        logo={logo}
        side={side}
      />
      <ModalBody
        submitOrder={submitOrder}
        side={side}
        coinCurrentPrice={coinCurrentPrice}
        onClose={onClose}
        coinAbbreviations={coinAbbreviations}
      />
    </Modal>
  );
};

export default OrderModal;

type TModalHeader = {
  side: TSide;
} & TCoinHeader;
const ModalHeader: React.FC<TModalHeader> = ({
  coinName,
  coinAbbreviations,
  logo,
  side,
}) => {
  return (
    <div style={{ padding: 16, paddingBottom: 0 }}>
      <Modal.Title id="contained-modal-title-vcenter">
        <FlexContainerSpaceBetween>
          <div style={{ alignSelf: "center" }}>
            <span style={{ color: side === "buy" ? mainGreen : mainRed }}>
              {side.toUpperCase()}
            </span>{" "}
            {coinName}
            <span style={{ fontSize: 15 }}> ({coinAbbreviations})</span>
          </div>
          <div style={{ alignSelf: "center" }}>
            <CoinLogo logo={logo} />
          </div>
        </FlexContainerSpaceBetween>
      </Modal.Title>
      <DividerWhite />
    </div>
  );
};

type TModalBody = {
  side: TSide;
  coinCurrentPrice: TCoinCurrentPrice;
  onClose: MouseEventHandler<HTMLElement>;
  coinAbbreviations: string;
} & TOrderForm;

const ModalBody: React.FC<TModalBody> = ({
  submitOrder,
  side,
  coinCurrentPrice,
  onClose,
  coinAbbreviations,
}) => {
  const initialFormData: TOrderFormData = {
    price: coinCurrentPrice.price.toString(),
    localAmount: "",
  };

  const [formData, updateFormData] = useState<TOrderFormData>(initialFormData);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
  ) => {
    const { value, name } = event.target;

    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitOrder = (event: any) => {
    submitOrder(side, {
      price: formData.price,
      amount: getOrderAmount(formData).toString(),
    });
    onClose(event);
  };

  return (
    <>
      <div style={{ padding: "0px 16px 16px 16px" }}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitOrder(e);
          }}
          id="order_modal_form"
        >
          {/* PRICE INPUT */}
          <Form.Group controlId="input_order_price">
            <Form.Label>Price (USD/{coinAbbreviations})</Form.Label>
            <FormControl
              required
              type="number"
              placeholder="0.0000"
              aria-label="Order Price"
              name="price"
              aria-autocomplete="none"
              onChange={handleChange}
              defaultValue={formData.price}
              step="any"
              inputMode="decimal"
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </Form.Group>
          {/* LOCALE AMOUNT INPUT */}
          <Form.Group controlId="input_order_localAmount">
            <Form.Label>Amount (USD)</Form.Label>
            <FormControl
              required
              type="number"
              placeholder="0.0000"
              aria-label="Order Amount"
              name="localAmount"
              aria-autocomplete="none"
              onChange={handleChange}
              step="any"
              defaultValue={formData.localAmount}
              inputMode="decimal"
            />
          </Form.Group>
          {/* BUY/SELL AMOUNT SUMMARY */}
          <BuyOrSellAmountSummayText
            side={side}
            orderDetail={formData}
            coinAbbreviations={coinAbbreviations}
          />
          <DividerWhite />
          {/* FORM ACTION BUTTONS */}
          <OrderModalActionButtons side={side} onClose={onClose} />
        </Form>
      </div>
    </>
  );
};
