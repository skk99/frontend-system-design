const express = require("express");
const app = express();

// SECURITY MIDDLEWARE: Protect against iframe-based attacks
app.use((req, res, next) => {
  // Content Security Policy (CSP) header to prevent this site from being framed by other websites
  // frame-ancestors 'none': Prevents this page from being embedded in any iframe from any origin
  // This protects against clickjacking attacks where malicious sites try to overlay this page
  res.setHeader("Content-Security-Policy", "frame-ancestors 'none'");
  //   res.setHeader("Content-Security-Policy", "frame-ancestors 'self' https://localhost.com:5010");

  // Secure session cookie configuration
  // These settings prevent cookie theft and enhance security
  res.cookie("sessionID", "12345", {
    httpOnly: true, // Prevents JavaScript from accessing the cookie (mitigates XSS-based theft)
    secure: true, // Cookie only sent over HTTPS (prevents man-in-the-middle attacks)
    sameSite: "strict", // Cookie only sent in same-site requests (prevents CSRF and data theft attacks)
  });
  next();
});

// Serve static files from the public directory
app.use(express.static("public"));

// Route 1: Clickjacking iframe vulnerability (protected)
// This route serves a page that attempts to break out of frames
app.get("/iframe-website1", (req, res) => {
  res.sendFile(__dirname + "/public/iframe-website1.html");
});

// Route 2: Malicious iframe attempting data theft
// This route demonstrates how an iframe might attempt to steal parent window data
app.get("/iframe-website2", (req, res) => {
  res.sendFile(__dirname + "/public/iframe-website2.html");
});

const port = process.env.PORT || 5011;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
