const Campaign = require('../models/Campaign');
const Lead = require('../models/Lead');

// ETL Process to Calculate Campaign Efficiency and Lead Conversions
exports.processCampaignData = async () => {
  try {
    // Extract: Fetch campaigns and leads
    const campaigns = await Campaign.find();
    const leads = await Lead.find();

    // Transform: Calculate efficiency for each campaign
    campaigns.forEach(campaign => {
      const convertedLeads = leads.filter(lead => lead.conversionStatus && lead.source === campaign.name);
      const campaignEfficiency = (convertedLeads.length / campaign.reach) * 100;

      // Log the transformed data
      console.log(`Campaign: ${campaign.name} - Efficiency: ${campaignEfficiency}%`);

      // Update campaign with calculated efficiency
      campaign.conversionRate = campaignEfficiency;
    });

    // Load: Save the transformed data back into the database
    await Promise.all(campaigns.map(campaign => campaign.save()));

    console.log('ETL process completed.');
  } catch (error) {
    console.error('Error during ETL process:', error);
  }
};
