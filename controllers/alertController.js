const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;

// Replace these values with your actual client ID, client secret, and redirect URI
const oauth2Client = new OAuth2(
  '776981482837-3r7s277bkollgs2ule12erkg5g1ekqjd.apps.googleusercontent.com', // Client ID
  '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', // Client Secret
  'https://developers.google.com/oauthplayground' // Redirect URI or your application's redirect URI
);

// Set the refresh token (you'll need to generate this from your Google account)
oauth2Client.setCredentials({
  refresh_token: '1//0484AWepQwyngCgYIARAAGAQSNwF-L9IrJJucLS_NIg0Ijh5QcIu0rDAs6kKjd7N6rBYdhUpjTH4C5kBRXYt9lFxd3_MmY9FTe7M',
});

exports.sendEmailAlert = async (req, res) => {
  const { email, message } = req.body;

  try {
    const accessToken = await oauth2Client.getAccessToken();
    if (!accessToken.token) {
      return res.status(401).send('Failed to retrieve access token');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'parasmanikhunte@gmail.com', // Your email
        clientId: '776981482837-3r7s277bkollgs2ule12erkg5g1ekqjd.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: '1//0484AWepQwyngCgYIARAAGAQSNwF-L9IrJJucLS_NIg0Ijh5QcIu0rDAs6kKjd7N6rBYdhUpjTH4C5kBRXYt9lFxd3_MmY9FTe7M',
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: 'parasmanikhunte@gmail.com',
      to: email,
      subject: 'Campaign Alert',
      text: message,
    };

    const result = await transporter.sendMail(mailOptions);
    res.status(200).send('Alert sent: ' + result.response);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email: ' + error.message);
  }
};
