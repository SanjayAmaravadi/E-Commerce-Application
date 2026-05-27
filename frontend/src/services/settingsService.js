import API from "./api";

export const getSettings = () => {
  return API.get("/admin/settings");
};

export const updateSettings = (data) => {
  return API.put("/admin/settings", data);
};