import { TSide } from "../../order-book-stream";

export type TModalVisible = boolean;

export type TSetModalVisible = (visible: TSide) => void;

export type TOrderFormData = {
  price: string;
  localAmount: string;
};
