import API from "./api";

export const createProduct = (data) => {
  return API.post("/admin/products", data);
};

export const updateProduct = (id, data) => {
  return API.put(`/admin/products/${id}`, data);
};

export const deleteProduct = (id) => {
  return API.delete(`/admin/products/${id}`);
};

