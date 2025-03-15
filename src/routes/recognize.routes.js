const express = require("express");

const recognizeRouter = express.Router();

const { sttRecognizeController } = require("../controllers");
const { receiveFile } = require("../middlewares/audio.middleware");

recognizeRouter.post(
  "/",
  receiveFile,
  sttRecognizeController.recognizeAudioSynchronous
);

recognizeRouter.post(
  "/stream-audio",
  sttRecognizeController.recognizeAudioStreaming
);

module.exports = recognizeRouter;
