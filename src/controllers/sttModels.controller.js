const SpeechToText = require("../services/stt.service");

const stt = new SpeechToText();

async function getAllModels(req, res) {
  try {
    const response = await stt.getAllModels();
    res.json({
      success: true,
      models: response,
    });
  } catch (error) {
    console.log(error);
  }
}

async function getSpecificModel(req, res) {
  try {
    const modelName = req.params.modelName;
    const response = await stt.getSpecificModel(modelName);
    res.json({
      success: true,
      model: response,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllModels,
  getSpecificModel,
};
