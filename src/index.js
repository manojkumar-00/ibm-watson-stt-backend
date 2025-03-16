const express = require("express");
const { PORT, INSTANCE_URL } = require("./config/server.config");
const { getToken } = require("./utils/auth.utils");

const apiRouter = require("./routes");

const app = express();

app.use(express.static("public")); // Serve frontend files

app.get("/ping", (_, res) => {
  res.status(200).json({
    message: `Sever is live at PORT:${PORT}`,
  });
});

app.get("/token", async (_, res) => {
  res.status(200).json({
    url: `${INSTANCE_URL}/v1/recognize?access_token=${await getToken()}`,
  });
});

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Sever is live at PORT:${PORT}`);
});
