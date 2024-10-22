const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  reach: Number,
  conversionRate: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Campaign', campaignSchema);
