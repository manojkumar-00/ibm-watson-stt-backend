const express = require("express");

const apiRouter = express.Router();

apiRouter.get("/", (_, res) => {
  res.status(200).json({
    message: `API Router is live`,
  });
});

apiRouter.post("/http-streaming", () => {});

apiRouter.post("/sockets-streaming", () => {});

module.exports = apiRouter;
