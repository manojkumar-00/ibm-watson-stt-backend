const axiosInstance = require("../utils/axios.instance");

class SpeechToText {
  async getAllModels() {
    const response = await axiosInstance.get("/v1/models");
    return response.data.models;
  }

  async getSpecificModel(modelName) {
    const response = await axiosInstance.get(`/v1/models/${modelName}`);
    return response.data;
  }
  async recognizeAudioSynchronous(file) {
    const response = await axiosInstance.post(`/v1/recognize`, file.buffer, {
      headers: {
        "Content-Type": file.mimetype || "audio/wav",
        Accept: "application/json",
      },
    });

    return response.data;
  }
}

module.exports = SpeechToText;
