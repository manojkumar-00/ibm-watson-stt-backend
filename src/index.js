const express = require("express");

const { PORT } = require("./config/server.config");
const apiRouter = require("./routes");

const app = express();

app.get("/ping", (_, res) => {
  res.status(200).json({
    message: `Sever is live at PORT:${PORT}`,
  });
});

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Sever is live at PORT:${PORT}`);
});
