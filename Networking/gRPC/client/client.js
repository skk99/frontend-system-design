// Path to protocol buffer definition
const PROTO_PATH = "./customers.proto";

// Import required gRPC packages
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load the protobuf
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

// Create gRPC client service
const CustomerService =
  grpc.loadPackageDefinition(packageDefinition).CustomerService;

// Create client instance
const client = new CustomerService(
  "127.0.0.1:30043", // Server address
  grpc.credentials.createInsecure() // Using insecure connection for demo
);

module.exports = client;
