const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  function: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  invite: String,
  guestCount: Number,
  details: String,
  happeningNow: {
    type: Boolean,
    default: false
  },
  contactHostEmail: {
    type: String,
    required: true
  },
  contactHostPhone: {
    type: String,
    required: true
  },
  guests: [{
    name: String,
    contactInformation: String
  }],
  reviews: [{
    content: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
