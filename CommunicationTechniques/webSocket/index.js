/**
 * WebSocket Implementation Example
 *
 * Definition:
 * WebSocket is a protocol that enables full-duplex, bidirectional communication between client and server over a single, long-lived connection.
 * Both client and server can send and receive messages at any time.
 *
 * Use Case:
 * Perfect for real-time applications like chat systems, collaborative tools, online gaming, and live data streaming.
 */

const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
// Create HTTP server instance
const server = createServer(app);
// Initialize Socket.IO server for WebSocket communication
const io = new Server(server);

// Serve the chat client HTML file
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// Listen for new WebSocket connections
io.on("connection", (socket) => {
  console.log("Connection established");

  // Listen for 'chat message' events from clients
  socket.on("chat message", (msg) => {
    console.log("received message", msg);
    // Broadcast received message to all connected clients
    io.emit("chat message", msg);
  });

  // Handle client disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected!");
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
