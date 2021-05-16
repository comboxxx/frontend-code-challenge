import { TOrderFormData } from "../models/ModalModel";

const getOrderAmount = (orderDetail: TOrderFormData) => {
  return parseFloat(orderDetail.localAmount) / parseFloat(orderDetail.price);
};

export default getOrderAmount;
