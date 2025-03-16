let ws;
let mediaRecorder;

async function getWatsonWebSocketUrl() {
  try {
    const response = await fetch("http://localhost:3000/token");
    const data = await response.json();
    if (!data.url) throw new Error("Failed to get Watson WebSocket URL");
    return data.url;
  } catch (error) {
    console.error("❌ Error fetching Watson token:", error);
    return null;
  }
}

async function connectToWatson(callback) {
  if (
    ws &&
    (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)
  ) {
    console.log("🔄 WebSocket is already connected or connecting...");
    callback(); // Proceed with recording/upload immediately
    return;
  }

  const wsUrl = await getWatsonWebSocketUrl();
  if (!wsUrl) return;

  ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    console.log("✅ Connected to IBM Watson STT");
    callback(); // Start recording/upload immediately after connection
  };

  ws.onmessage = (event) => {
    try {
      const result = JSON.parse(event.data);
      if (result.results) {
        document.getElementById("transcript").innerText =
          result.results[0].alternatives[0].transcript;
      }
    } catch (error) {
      console.error("❌ WebSocket Parse Error:", error);
    }
  };

  ws.onerror = (err) => console.error("❌ WebSocket Error:", err);

  ws.onclose = (event) => {
    console.warn("⚠️ WebSocket closed. Reconnecting in 3 seconds...");
    if (event.code !== 1000) {
      setTimeout(() => connectToWatson(callback), 3000);
    }
  };
}

function sendStartMessage(contentType) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    const configMessage = {
      action: "start",
      content_type: contentType,
      interim_results: true,
    };
    ws.send(JSON.stringify(configMessage));
  }
}

function startRecording() {
  connectToWatson(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus", // Fixed: Use a valid MIME type
      });

      mediaRecorder.start(1000);

      sendStartMessage("audio/webm"); // Match the MIME type with WebSocket

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && ws && ws.readyState === WebSocket.OPEN) {
          ws.send(event.data);
        }
      };

      document.getElementById("start").disabled = true;
      document.getElementById("stop").disabled = false;
    });
  });
}

function sendStopMessage() {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ action: "stop" }));
    console.log("🛑 Sent stop message to WebSocket.");
  }
}

async function uploadFile() {
  const fileInput = document.getElementById("audioFile");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select an audio file.");
    return;
  }

  console.log("📂 Selected File:", file.name);

  connectToWatson(() => {
    const reader = new FileReader();
    const chunkSize = 1024 * 16; // 16 KB per chunk (adjust as needed)
    let offset = 0;

    reader.onload = async (event) => {
      const audioData = event.target.result;

      sendStartMessage(file.type); // Send config message first

      while (offset < audioData.byteLength) {
        if (ws.readyState !== WebSocket.OPEN) {
          console.error("❌ WebSocket closed while sending.");
          return;
        }

        const chunk = audioData.slice(offset, offset + chunkSize);
        ws.send(chunk);
        offset += chunkSize;

        await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate real-time streaming delay
      }

      sendStopMessage(); // Tell Watson STT that file is complete
    };

    reader.readAsArrayBuffer(file);
  });
}

document.getElementById("start").addEventListener("click", startRecording);

document.getElementById("stop").addEventListener("click", () => {
  if (mediaRecorder) {
    mediaRecorder.stop();
    console.log("⏹ Stopped recording.");
  }
  document.getElementById("start").disabled = false;
  document.getElementById("stop").disabled = true;
});

document.getElementById("upload").addEventListener("click", uploadFile);

document.getElementById("clear").addEventListener("click", () => {
  document.getElementById("transcript").innerText = "";
  console.log("🧹 Transcript cleared.");
});
