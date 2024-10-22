const Lead = require('../models/Lead'); // Adjust the path to your model as necessary
const fs = require('fs');
const path = require('path');
const pdf = require('pdfkit'); // Assuming you're using pdfkit to create PDFs

exports.generatePDFReport = async (req, res) => {
    const reportsDir = path.join(__dirname, '..', 'reports');
    const pdfFilePath = path.join(reportsDir, 'lead_report.pdf');

    // Check if the directory exists, if not, create it
    if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
    }

    // Create a new PDF document
    const doc = new pdf();
    
    // Pipe the PDF into a write stream
    const writeStream = fs.createWriteStream(pdfFilePath);
    doc.pipe(writeStream);
    
    // Add content to the PDF
    doc.fontSize(25).text('Lead Report', { align: 'center' });
    doc.moveDown();

    try {
        const leads = await Lead.find(); // Fetch the leads from the database
        leads.forEach((lead) => {
            doc.fontSize(12).text(`Name: ${lead.name}, Email: ${lead.email}, Status: ${lead.status}`);
        });
        
        // Finalize the PDF and end the stream
        doc.end();

        // Wait for the write stream to finish
        writeStream.on('finish', () => {
            res.status(200).sendFile(pdfFilePath, (err) => {
                if (err) {
                    console.error('Error sending the file:', err);
                    res.status(500).send('Error generating PDF report');
                }
            });
        });
        
    } catch (error) {
        console.error('Error generating PDF report:', error);
        res.status(500).send('Error generating PDF report');
    }
};


const { Parser } = require('json2csv');

exports.generateCSVReport = async (req, res) => {
  const leads = await Lead.find(); // Fetch the leads
  const fields = ['name', 'email', 'source', 'leadScore'];
  const parser = new Parser({ fields });
  const csv = parser.parse(leads);

  res.attachment('lead_report.csv').send(csv); // Send CSV as attachment
};

