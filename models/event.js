const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  occasion: {
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
  guestCount: {
    type: Number,
    required: true
  },
  details: String,
  contactHostEmail: {
    type: String,
    required: true
  },
  contactHostPhone: {
    type: String,
    required: true
  },
  rsvp: {
    type: String,
    enum: ['Going', 'Not Going', 'Maybe'],
    default: 'Maybe'
  },
  happeningNow: {
    type: Boolean,
    default: false
  },
  guests: [{
    name: String,
    contactInformation: String
  }],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
