const axios = require("axios");

const { INSTANCE_URL } = require("../config/server.config");
const { getToken } = require("./auth.utils");

const axiosInstance = axios.create({
  baseURL: INSTANCE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${await getToken()}`;
    return config;
  },
  (error) => Promise.reject(error)
);

module.exports = axiosInstance;
