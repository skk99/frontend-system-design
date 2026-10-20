/**
 * Short Polling Implementation Example
 *
 * Definition:
 * Short polling is a technique where the client repeatedly sends requests to the server at regular intervals to check for updates.
 * The server responds immediately with the latest data, whether or not it has changed.
 *
 * Use Case:
 * Useful for simple scenarios where real-time updates are not critical, such as checking for new notifications or messages periodically.
 */

const express = require("express");
const app = express();

// In-memory value to demonstrate short-polling updates.
// In real systems this would be stored in a database or external service.
let data = "Initial Data";

// Serve the client HTML that implements short polling.
app.get("/", (req, res) => {
  // sendFile serves the static HTML page which will periodically call /getData
  res.sendFile(__dirname + "/index.html");
});

// Polling endpoint: clients call this repeatedly to get the latest value.
app.get("/getData", (req, res) => {
  // Return a JSON object so the frontend can parse and display `data`.
  res.send({
    data,
  });
});

// Simple endpoint to mutate the data for demo purposes.
// Note: in production use POST/PUT and proper validation/auth.
app.get("/updateData", (req, res) => {
  // Simulate an external update that clients will see on their next poll.
  data = "Updated Data";
  res.send({
    data,
  });
});

const port = process.env.PORT || 5011;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
