import API from "./api";

export const addReview = (data) => {
  return API.post("/reviews", data);
};

export const getReviews = (productId) => {
  return API.get(`/reviews/${productId}`);
};
