const axiosInstance = require("../utils/axios.instance");
const https = require("https");

const { getToken } = require("../utils/auth.utils");

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

  async transcribeStreamingAudio(req, res) {
    try {
      const contentType = req.headers["content-type"] || "audio/wav";
      console.log("Receiving audio stream...");

      const ibmRequest = https.request(
        {
          hostname: `api.au-syd.speech-to-text.watson.cloud.ibm.com`,
          path: `/instances/5f49a350-ffac-44e7-85a3-6d3a3461d38a/v1/recognize`,
          method: "POST",
          headers: {
            "Content-Type": contentType,
            "Transfer-Encoding": "chunked",
            Accept: "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        },
        (ibmResponse) => {
          console.log("IBM STT response received");
          // Pipe IBM STT response back to client
          ibmResponse.pipe(res);
        }
      );

      ibmRequest.on("error", (err) => {
        console.error("IBM STT Error:", err.message);
        res.status(500).json({ error: "Failed to process speech-to-text" });
      });

      req.on("data", (chunk) => {
        console.log(`Received ${chunk.length} bytes`);
        ibmRequest.write(chunk);
      });

      req.on("end", () => {
        console.log("Audio stream ended");
        ibmRequest.end();
      });

      req.on("error", (err) => {
        console.error("Request error:", err.message);
        ibmRequest.end();
      });
    } catch (error) {
      console.error("IBM STT Error:", error.message);
      res.status(500).json({ error: "Failed to process speech-to-text" });
    }
  }
}

module.exports = SpeechToText;
