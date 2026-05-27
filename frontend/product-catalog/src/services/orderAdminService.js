import API from "./api";

export const getAllOrders = () => {
  return API.get("/orders/admin/all");
};

export const updateOrderStatus = (orderId, status) => {
  return API.put(`/orders/admin/${orderId}/status?status=${status}`);
};
