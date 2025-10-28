const Brevo = require('@getbrevo/brevo');

// Initialize Brevo client
const brevo = new Brevo.TransactionalEmailsApi();
brevo.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

// Send OTP email
const sendOTPEmail = async (email, otp, name) => {
  try {
    await brevo.sendTransacEmail({
      sender: { name: 'FinCart', email: process.env.EMAIL_FROM },
      to: [{ email }],
      subject: 'Your FinCart Login OTP Code',
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background-color: #4CAF50;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 0 0 5px 5px;
            }
            .otp-box {
              background-color: #f0f0f0;
              border: 2px dashed #4CAF50;
              padding: 20px;
              text-align: center;
              margin: 20px 0;
              border-radius: 5px;
            }
            .otp-code {
              font-size: 32px;
              font-weight: bold;
              color: #4CAF50;
              letter-spacing: 5px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
              color: #666;
            }
            .warning {
              color: #ff6b6b;
              font-weight: bold;
              margin-top: 15px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💰 FinCart</h1>
            </div>
            <div class="content">
              <h2>Hello ${name}!</h2>
              <p>You requested to login to your FinCart account. Please use the following One-Time Password (OTP) to complete your login:</p>
              
              <div class="otp-box">
                <div class="otp-code">${otp}</div>
              </div>
              
              <p><strong>This OTP is valid for ${process.env.OTP_EXPIRE_MINUTES || 5} minutes.</strong></p>
              
              <p>If you didn't request this OTP, please ignore this email or contact our support team if you have concerns.</p>
              
              <p class="warning">⚠️ Never share this OTP with anyone. FinCart will never ask for your OTP.</p>
              
              <p>Best regards,<br>The FinCart Team</p>
            </div>
            <div class="footer">
              <p>This is an automated email. Please do not reply to this message.</p>
              <p>&copy; ${new Date().getFullYear()} FinCart. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    console.log('✅ OTP email sent to:', email);
  } catch (error) {
    console.error('❌ Error sending OTP via Brevo API:', error.response?.body || error);
    throw new Error('Failed to send OTP email');
  }
};

// Optional welcome email
const sendWelcomeEmail = async (email, name) => {
  try {
    await brevo.sendTransacEmail({
      sender: { name: 'FinCart', email: process.env.EMAIL_FROM },
      to: [{ email }],
      subject: 'Welcome to FinCart!',
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background-color: #4CAF50;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 0 0 5px 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💰 Welcome to FinCart!</h1>
            </div>
            <div class="content">
              <h2>Hello ${name}!</h2>
              <p>Thank you for joining FinCart - Your Personal Finance Management System.</p>
              <p>We're excited to have you on board! You can now:</p>
              <ul>
                <li>Track your income and expenses</li>
                <li>Set and monitor financial goals</li>
                <li>Create financial plans</li>
                <li>Manage your investments</li>
                <li>Generate financial reports</li>
              </ul>
              <p>Get started by exploring your dashboard and setting up your first financial goal!</p>
              <p>Best regards,<br>The FinCart Team</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    console.log('✅ Welcome email sent to:', email);
  } catch (error) {
    console.error('❌ Error sending welcome email:', error.response?.body || error);
  }
};

module.exports = { sendOTPEmail, sendWelcomeEmail };

