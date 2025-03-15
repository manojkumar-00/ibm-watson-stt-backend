const express = require("express");
const multer = require("multer");

const { sttController } = require("../controllers");

const upload = multer({ dest: "uploads/" });
const modelRouter = require("./models.route");
const apiRouter = express.Router();

apiRouter.get("/", (_, res) => {
  res.status(200).json({
    message: `API Router is live`,
  });
});

apiRouter.use("/models", modelRouter);

apiRouter.post("/recognize", () => {});

module.exports = apiRouter;
