import API from "./api";

export const createPaymentOrder = (orderId) => {
  return API.post("/payments/create-order", {
    orderId,
  });
};

export const verifyPayment = (data) => {
  return API.post("/payments/verify", data);
};
