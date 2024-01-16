import nodemailer from "nodemailer";
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from "../../env.js";


const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});



const createDynamicHTML = (text, link) => {
  return `
    <div style="background-image:url(https://discover-monroe.imgix.net/images/FB-theretroshop.jpg?auto=compress%2Cformat&fit=max&h=1080&q=80&w=1920&s=fa84b19b1ea6a547601b4957a6f20277); padding: 20px; width: 300px;">
       <h1>RETROSHOP </h1>
      <p>${text}</p> 
      <a href="${link}">Enlace</a>
    </div>
  `;
};

const sendMail = async (email, subject, text,link) => {
  const mailOptions = {
    from: SMTP_USER,
    to: email,
    subject,
    text,
   html: createDynamicHTML(text, link),

  };
  await transport.sendMail(mailOptions);
};

export default sendMail;
