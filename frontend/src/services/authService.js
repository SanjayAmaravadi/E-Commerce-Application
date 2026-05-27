import API from "./api";

export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

export const verifyOtp = (data) => {
  return API.post("/auth/verify-otp", data);
};

export const resendOtp = (email) => {
  return API.post(`/auth/resend-otp?email=${email}`);
};

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

export const forgotPassword = (data) => {
  return API.post("/auth/forgot-password", data);
};

export const resetPassword = (data) => {
  return API.post("/auth/reset-password", data);
};