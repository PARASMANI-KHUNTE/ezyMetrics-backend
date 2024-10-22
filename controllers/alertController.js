const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;

// Replace these values with your actual client ID, client secret, and redirect URI
const oauth2Client = new OAuth2(
  process.env.client_id , // Client ID
  process.env.client_secret, // Client Secret
  'https://developers.google.com/oauthplayground' // Redirect URI or your application's redirect URI
);

// Set the refresh token (you'll need to generate this from your Google account)
oauth2Client.setCredentials({
  refresh_token: process.env.refresh_token,
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
        user: process.env.your_email, // Your email
        clientId: process.env.client_id ,
        clientSecret: process.env.client_secret,
        refreshToken: process.env.refresh_token,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: process.env.your_email,
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
