import API from "./api";

export const inviteAdmin = (data) => {
  return API.post("/admin/invite", data);
};

export const completeAdminSetup = (data) => {
  return API.post("/admin/invite/complete", data);
};

export const getAdminInvites = () => {
  return API.get("/admin/invite");
};

export const deleteInvite = (id) => {
  return API.delete(`/admin/invite/${id}`);
};