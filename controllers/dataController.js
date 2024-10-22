const Lead = require('../models/Lead');
const Campaign = require('../models/Campaign');

// Dummy lead data
exports.getLeads = async (req, res) => {
  const leads = await Lead.find(); // Normally you'd fetch from an external service
  res.json(leads);
};

// Dummy campaign data
exports.getCampaigns = async (req, res) => {
  const campaigns = await Campaign.find(); // Normally you'd fetch from an external service
  res.json(campaigns);
};
