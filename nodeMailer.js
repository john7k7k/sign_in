const nodemailer = require("nodemailer");

module.exports = (mailer_data = {
    service: "gmail",
    auth: {
      user: "robot.send.auto.mail@gmail.com",
      pass: "ngywhkrdognvhxti"
    }
  }) => nodemailer.createTransport(mailer_data);
  