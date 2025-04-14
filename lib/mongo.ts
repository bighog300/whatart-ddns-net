const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables.");
}

const client = new MongoClient(uri);
const clientPromise = client.connect();

module.exports = clientPromise;
