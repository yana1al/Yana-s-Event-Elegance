const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:')); // Handle connection errors

db.once('open', function() {
  console.log(`Connected to MongoDB database at ${db.host}:${db.port}`);
});

module.exports = db;
