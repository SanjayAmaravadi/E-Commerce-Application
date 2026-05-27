import API from "./api";

export const getWishlist = () => {
  return API.get("/wishlist");
};

export const addToWishlist = (productId) => {
  return API.post(`/wishlist/${productId}`);
};

export const removeWishlist = (id) => {
  return API.delete(`/wishlist/${id}`);
};
