async function receiveFile(req, res, next) {
  let chunks = [];
  let totalSize = 0;
  const uniqueFileName = `audio_${Date.now()}`;

  // Collect binary data
  req.on("data", (chunk) => {
    chunks.push(chunk);
    totalSize += chunk.length;
  });

  req.on("end", () => {
    req.file = {
      buffer: Buffer.concat(chunks),
      mimetype: req.headers["content-type"] || "audio/wav",
      size: totalSize,
      filename: uniqueFileName,
    };
    next();
  });
}

module.exports = {
  receiveFile,
};
