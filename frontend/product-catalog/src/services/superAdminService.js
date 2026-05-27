import API from "./api";

export const getAdmins = () => {
  return API.get("/super-admin/admins");
};

export const removeAdmin = (id) => {
  return API.delete(`/super-admin/admins/${id}`);
};

export const promoteAdmin = (id) => {
  return API.put(`/super-admin/admins/promote/${id}`);
};

export const demoteAdmin = (id) => {
  return API.put(`/super-admin/admins/demote/${id}`);
};

export const createAdmin = (data) => {
  return API.post("/super-admin/admins", data);
};
