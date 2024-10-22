const express = require('express');
const { generatePDFReport, generateCSVReport } = require('../controllers/reportController');
const { sendEmailAlert } = require('../controllers/alertController');

const router = express.Router();



router.get('/reports/pdf', generatePDFReport);
router.get('/reports/csv', generateCSVReport);
router.post('/alerts/email', sendEmailAlert);

module.exports = router;
