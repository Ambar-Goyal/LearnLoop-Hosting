import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL, // from Vercel env
  withCredentials: true, // ✅ MUST BE in code
});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: method,
    url: url,
    data: bodyData || null,
    headers: headers || null,
    params: params || null,
  });
};
