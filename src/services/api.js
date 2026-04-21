import axios from "axios";

export const API_BASE_URL = "https://t4e-testserver.onrender.com/api";

export const fetchToken = async ({ studentId, password }) => {
  const response = await axios.post(`${API_BASE_URL}/public/token`, {
    studentId,
    password,
  });

  return response.data;
};

export const fetchPrivateData = async ({ token }) => {
  const response = await axios.get(`${API_BASE_URL}/private/data`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
