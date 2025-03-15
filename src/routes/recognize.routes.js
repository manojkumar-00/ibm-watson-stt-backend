const express = require("express");
const multer = require("multer");

const recognizeRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { sttRecognizeController } = require("../controllers");
const { receiveFile } = require("../middlewares/audio.middleware");

recognizeRouter.post(
  "/",
  receiveFile,
  sttRecognizeController.recognizeAudioSynchronous
);

module.exports = recognizeRouter;
