const express = require("express");

const modelRouter = express.Router();

const { sttModelsController } = require("../controllers");

modelRouter.get("/", sttModelsController.getAllModels);
modelRouter.get("/:modelName", sttModelsController.getSpecificModel);

module.exports = modelRouter;
