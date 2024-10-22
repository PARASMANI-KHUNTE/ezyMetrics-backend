const express = require('express');
const connectDB = require('./config/db');
const dataRoutes = require('./routes/dataRoutes');
const reportRoutes = require('./routes/reportRoutes');
const cron = require('node-cron');
const { processCampaignData } = require('./controllers/etlController');
const dotenv =  require('dotenv')
dotenv.config
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/v1', dataRoutes);
app.use('/api/v1', reportRoutes);
app.use('/',(req,res)=>{
    res.json({message : "server is runing fine."})
})
// Schedule the ETL process (daily at midnight)
cron.schedule('0 0 * * *', () => {
  console.log('Running ETL Process...');
  processCampaignData();
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port  on http://localhost:${PORT}`));
