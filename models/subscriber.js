const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  contactInformation: String, // This field represents either email or phone number
}, {
  timestamps: true
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
