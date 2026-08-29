import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOption = {
      from: `Shophive <${process.env.GMAIL_USER}>`,
      to: email,
      subject: subject,
      html: message,
    };

    await transporter.sendMail(mailOption);
    console.log(`Email Successfully Sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error.message}`);
  }
};
