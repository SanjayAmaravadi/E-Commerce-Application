import API from "./api";

export const getProfile = () => {
  return API.get("/profile");
};

export const updateProfile = (data) => {
  return API.put("/profile", data);
};

export const changePassword = (data) => {
  return API.put("/profile/change-password", data);
};