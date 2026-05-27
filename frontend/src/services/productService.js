import API from "./api";

export const getProducts = (
  page = 0,
  size = 12,
  search = "",
  categoryId = "",
  sort = "asc",
) => {
  return API.get("/products", {
    params: { page, size, search, categoryId, sort },
  });
};

export const getProductById = (id) => API.get(`/products/${id}`);

export const getCategories = () => {
  return API.get("/categories");
};
