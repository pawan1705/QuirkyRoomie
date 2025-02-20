import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "8433f9001@smtp-brevo.com",
    pass: "F05XLcPghA1KNZO6",
  },
});

export default transporter;
