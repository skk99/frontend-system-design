/**
 * Server-Sent Events (SSE) Implementation Example
 *
 * Definition:
 * SSE is a unidirectional communication technique where the server pushes updates to the client over a single HTTP connection.
 * The client receives automatic updates from the server as events.
 *
 * Use Case:
 * Ideal for real-time feeds, notifications, or monitoring dashboards where the server needs to push data to the client.
 */

const express = require("express");
const app = express();
const { join } = require("node:path");

// SSE endpoint
app.get("/sse", (req, res) => {
  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send initial message to client
  res.write("data: Welcome to Server sent event \n\n");

  // Send server time to client every 5 seconds
  const intervalId = setInterval(() => {
    res.write(`data: Server Time ${new Date().toLocaleDateString()} \n\n`);
  }, 5000);

  // Clean up when client closes connection
  req.on("close", () => {
    clearInterval(intervalId);
  });
});

// Serve the frontend HTML file
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
