import API from "./api";

export const getCart = () => {
  return API.get("/cart");
};

export const addToCart = (data) => {
  return API.post("/cart", data);
};

export const removeCartItem = (itemId) => {
  return API.delete(`/cart/${itemId}`);
};

export const decreaseCartQuantity = (itemId) => {
  return API.put(`/cart/decrease/${itemId}`);
};