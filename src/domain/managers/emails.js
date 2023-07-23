import nodemailer from "nodemailer";
import { resolve } from "path";
import fs from "fs";
import Handlebars from "handlebars";
import dotenv from "dotenv";
import {
  createHash,
  generateToken,
  isValidPassword,
} from "../../shared/index.js";
dotenv.config();

class EmailManager {
  constructor() {
    this.smtp_config = {
      service: "gmail",
      port: 594,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_KEY,
      },
    };
  }

  async send(templateFile, email) {
    const transporter = nodemailer.createTransport(this.smtp_config);

    const token = await generateToken({ email });
    console.log(token);
    const link_generado = `http://localhost:8084/api/email/formChangePassword?token=${token}`;

    const templatePath = resolve(`src/presentation/views/${templateFile}`);
    const source = fs.readFileSync(templatePath).toString();
    const template = Handlebars.compile(source);
    const html = template({
      userName: "Carolina",
      link: link_generado,
    });

    const mailOptions = {
      from: "carolinagallo02@gmail.com",
      to: email,
      subject: "Subject",
      html,
    };

    await transporter.sendMail(mailOptions);
  }
}

export default EmailManager;
