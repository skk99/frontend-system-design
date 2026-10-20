const client = require("./client");
const express = require("express");
const bodyParser = require("body-parser");

// Create Express application
const app = express();

// Middleware for parsing JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// REST endpoint to get all customers
app.get("/", (req, res) => {
  client.getAll(null, (err, data) => {
    if (!err) {
      res.send(data.customers);
    }
  });
});

// REST endpoint to create a new customer
app.post("/create", (req, res) => {
  let newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };

  client.insert(newCustomer, (err, data) => {
    if (err) throw err;

    console.log("Customer created successfully", data);
    res.send({ message: "Customer created successfully" });
  });
});

// REST endpoint to update an existing customer
app.post("/update", (req, res) => {
  const updateCustomer = {
    id: req.body.id,
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };

  client.update(updateCustomer, (err, data) => {
    if (err) throw err;

    console.log("Customer updated successfully", data);
    res.send({ message: "Customer updated successfully" });
  });
});

// REST endpoint to remove a customer
app.post("/remove", (req, res) => {
  client.remove({ id: req.body.customer_id }, (err, _) => {
    if (err) throw err;

    console.log("Customer removed successfully");
    res.send({ message: "Customer removed successfully" });
  });
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running at port %d", PORT);
});
