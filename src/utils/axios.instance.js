const axios = require("axios");

const { INSTANCE_URL } = require("../config/server.config");
const { generateNewToken } = require("./auth.utils");

let authToken = null;
let tokenExpiry = null;

async function getToken() {
  if (!authToken || Date.now() >= tokenExpiry) {
    const newToken = await generateNewToken();
    authToken = newToken.data.access_token;
    tokenExpiry = newToken.data.expiration;
  }
  return authToken;
}

const axiosInstance = axios.create({
  baseURL: INSTANCE_URL,
  // timeout: 5000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${await getToken()}`;
    return config;
  },
  (error) => Promise.reject(error)
);

module.exports = axiosInstance;
