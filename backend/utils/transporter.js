const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    /*service: 'gmail', // or any other email service
    auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_PASSWORD // your app password (see note below)
    }*/
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL_USER, // your email address
      pass: process.env.EMAIL_PASSWORD // your app password (see note below)
    }
});

// Verify the transporter (optional)
transporter.verify((error, success) => {
    if (error) {
        console.error("Email service not configured:", error.message);
    } else {
        console.log("Email service configured successfully");
    }
});

module.exports = transporter;

// Function to send the email
const sendEmail = async (toEmail, fullName, username, password) => {
    const mailOptions = {
        from: '"Your App Name" <noreply@yourapp.com>', // sender address
        to: toEmail, // recipient email address
        subject: "Your New Account Credentials", // Subject line
        text: `Hello ${fullName},\n\nYour new temporary username: ${username} and password is: ${password}\n\nFor security reasons, please log in and change it as soon as possible.`, // plain text body
        html: `<p>Hello ${fullName},</p><p>Your new temporary username: <strong>${username}</strong> and password is: <strong>${password}</strong></p><p>For security reasons, please log in and change it as soon as possible.</p>` // html body
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
module.exports.sendEmail = sendEmail;

