const SpeechToText = require("../services/stt.service");

const stt = new SpeechToText();

async function recognizeAudioSynchronous(req, res) {
  try {
    const receivedFile = req.file;

    if (receivedFile.size === 0) {
      res.json({
        success: false,
        message: "Audio file missing",
      });
    }

    const response = await stt.recognizeAudioSynchronous(receivedFile);
    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  recognizeAudioSynchronous,
};
