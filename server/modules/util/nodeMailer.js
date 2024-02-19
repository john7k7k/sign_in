const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = (mailer_data = {
    service: "gmail",
    auth: {
      user: process.env.DB_GMAIL_ACCOUNT,
      pass: process.env.DB_GMAIL_PASS
    }
  }) => nodemailer.createTransport(mailer_data);
  