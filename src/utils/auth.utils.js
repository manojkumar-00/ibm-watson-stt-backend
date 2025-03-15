const axios = require("axios");
const { API_KEY } = require("../config/server.config");

let authToken = null;
let tokenExpiry = null;

async function generateNewToken() {
  try {
    const data = new URLSearchParams({
      grant_type: "urn:ibm:params:oauth:grant-type:apikey",
      apikey: API_KEY,
    });

    const response = await axios.post(
      "https://iam.cloud.ibm.com/identity/token",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching token:");
  }
}

async function getToken() {
  if (!authToken || Date.now() >= tokenExpiry) {
    const newToken = await generateNewToken();
    authToken = newToken.data.access_token;
    tokenExpiry = newToken.data.expiration;
  }
  return authToken;
}

module.exports = { getToken };
