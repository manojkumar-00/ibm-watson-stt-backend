const express = require("express");

const modelRouter = require("./models.routes");
const recognizeRouter = require("./recognize.routes");
const apiRouter = express.Router();

apiRouter.get("/", (_, res) => {
  res.status(200).json({
    message: `API Router is live`,
  });
});

apiRouter.use("/models", modelRouter);

apiRouter.use("/recognize", recognizeRouter);

module.exports = apiRouter;
