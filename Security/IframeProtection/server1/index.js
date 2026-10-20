const express = require("express");
const app = express();

// Serve static files from the public directory
app.use(express.static("public"));

// Route 1: Clickjacking vulnerability demonstration
// This example shows how an attacker can overlay an invisible iframe on top of legitimate UI elements
app.get("/example1", (req, res) => {
  res.sendFile(__dirname + "/public/example1.html");
});

// Route 2: Data theft via JavaScript vulnerability demonstration
// This example demonstrates how a malicious iframe can attempt to steal data from the parent window
app.get("/example2", (req, res) => {
  res.sendFile(__dirname + "/public/example2.html");
});

// Route 3: External iframe rendering vulnerability demonstration
// This example shows the risks of embedding external websites without proper restrictions
app.get("/example3", (req, res) => {
  res.sendFile(__dirname + "/public/example3.html");
});

const port = process.env.PORT || 5010;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
