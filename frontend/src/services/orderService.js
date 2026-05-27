import API from "./api";

export const checkout = (paymentMethod = "ONLINE") => {
  return API.post(`/orders/checkout`, null, {
    params: {
      paymentMethod,
    },
  });
};

export const getMyOrders = () => {
  return API.get("/orders/my-orders");
};
