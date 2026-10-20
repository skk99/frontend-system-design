/**
 * Webhook Implementation Example
 *
 * Definition:
 * A webhook is a user-defined HTTP callback that is triggered by an event in a source system.
 * When the event occurs, the source system makes an HTTP POST request to the configured URL (webhook endpoint).
 *
 * Use Case:
 * Commonly used for real-time notifications, payment status updates, or integrating external services (e.g., Stripe payment processor).
 * The external service calls your webhook endpoint when an event (like payment completion) happens.
 */

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Parse incoming JSON requests
app.use(bodyParser.json());

// Webhook endpoint to receive events from external services
app.post("/webhook", (req, res) => {
  // Extract the payload from the incoming POST request
  const payload = req.body;

  // Log the received payload (process it as needed for your application)
  console.log("Received webhook payload:", payload);

  // Send a response to acknowledge receipt of the webhook
  res.status(200).send("Webhook received successfully");
});

// Start the server and listen for incoming webhook requests
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
