/**
 * Long Polling Implementation Example
 *
 * Definition:
 * Long polling is a technique where the client sends a request to the server and the server holds the request open until new data is available or a timeout occurs.
 * Once the server responds, the client immediately sends another request, creating a near real-time update mechanism.
 *
 * Use Case:
 * Suitable for scenarios where real-time updates are needed but WebSockets are not feasible, such as chat applications or live dashboards.
 */

const express = require("express");
const app = express();

// In-memory value to demonstrate long-polling updates.
// In real systems, this would be stored in a database or external service.
let data = "Initial Data";

// Array to keep track of clients waiting for new data.
// Each entry is a response object that will be replied to when data changes.
const waitingClients = [];

// Serve the client HTML that implements long polling.
app.get("/", (req, res) => {
  // sendFile serves the static HTML page which will call /getData using long polling
  res.sendFile(__dirname + "/index.html");
});

// Long polling endpoint: client sends last received data, server responds immediately if new data is available,
// otherwise holds the connection until data changes.
app.get("/getData", (req, res) => {
  // If data has changed since client's last request, respond immediately.
  if (data !== req.query.lastData) {
    res.json({ data });
  } else {
    // Otherwise, store the response object to reply later when data updates.
    waitingClients.push(res);
  }
});

// Endpoint to update the data for demo purposes.
// When data changes, respond to all waiting clients.
app.get("/updateData", (req, res) => {
  // Update the in-memory data value.
  data = req.query.data;

  // Respond to all clients waiting for new data.
  while (waitingClients.length > 0) {
    const client = waitingClients.pop();
    client.json({ data });
  }
  // Respond to the updater.
  res.send({ success: "Data updated successfully" });
});

const port = process.env.PORT || 5011;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
