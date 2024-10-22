const express = require('express');
const { getLeads, getCampaigns } = require('../controllers/dataController');

const router = express.Router();

router.get('/crm/leads', getLeads);
router.get('/marketing/campaigns', getCampaigns);

module.exports = router;
