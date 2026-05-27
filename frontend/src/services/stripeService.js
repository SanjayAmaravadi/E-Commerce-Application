import API from "./api";

export const createStripeSession = async (orderId) => {
  return API.post("/payments/create-checkout-session", {
    orderId,
  });
};
