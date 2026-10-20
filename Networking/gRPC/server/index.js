// Path to the protocol buffer definition file
const PROTO_PATH = "./customers.proto";

// Import required gRPC packages
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load the protobuf
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true, // Keep field names as they are in proto
  longs: String, // Convert int64 to strings
  enums: String, // Convert enums to strings
  arrays: true, // Convert repeated fields to arrays
});

// Load the package definition to create gRPC service
const customersProto = grpc.loadPackageDefinition(packageDefinition);

// Create a new gRPC server
const server = new grpc.Server();

// In-memory customers database
const customers = [
  {
    id: "sdfshdfsd",
    name: "Chirag Goel",
    age: 22,
    address: "Bangalore",
  },
  {
    id: "cvvbcbewb",
    name: "Akshay Saini",
    age: 22,
    address: "Uttrakhand",
  },
];

// Implement and add service methods to the server
server.addService(customersProto.CustomerService.service, {
  // Get all customers
  getAll: (call, callback) => {
    callback(null, { customers });
  },

  // Get customer by ID
  get: (call, callback) => {
    let customer = customers.find((n) => n.id == call.request.id);

    if (customer) {
      callback(null, customer);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found",
      });
    }
  },

  // Insert new customer
  insert: (call, callback) => {
    let customer = call.request;

    customer.id = Math.random(); // uuidv4
    customers.push(customer);
    callback(null, customer);
  },

  // Update existing customer
  update: (call, callback) => {
    let existingCustomer = customers.find((n) => n.id == call.request.id);

    if (existingCustomer) {
      existingCustomer.name = call.request.name;
      existingCustomer.age = call.request.age;
      existingCustomer.address = call.request.address;
      callback(null, existingCustomer);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found",
      });
    }
  },

  // Remove customer
  remove: (call, callback) => {
    let existingCustomerIndex = customers.findIndex(
      (n) => n.id == call.request.id
    );

    if (existingCustomerIndex != -1) {
      customers.splice(existingCustomerIndex, 1);
      callback(null, {});
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found",
      });
    }
  },
});

// Start the server
server.bindAsync(
  "127.0.0.1:30043", // Server address
  grpc.ServerCredentials.createInsecure(), // Using insecure connection for demo
  (err, port) => {
    if (err) {
      console.error(`Error starting gRPC server: ${err}`);
    } else {
      server.start();
      console.log(`gRPC server is listening on ${port}`);
    }
  }
);
