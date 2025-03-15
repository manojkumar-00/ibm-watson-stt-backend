const express = require("express");

const { PORT } = require("./config/server.config");

const app = express();

app.get("/", (_, res) => {
  res.status(200).json({
    message: `Sever is live at PORT:${PORT}`,
  });
});

app.listen(PORT, () => {
  console.log(`Sever is live at PORT:${PORT}`);
});
