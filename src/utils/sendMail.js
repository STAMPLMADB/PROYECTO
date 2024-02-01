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
  return `<div style="background-image: url(https://i.pinimg.com/564x/f3/a6/29/f3a629d585af11298a8d99c25e658f7c.jpg); background-size: cover; 
  padding: 20px;
   width: 600px; 
  height: 600px; 
  display: flex !important; 
  justify-content: center !important;
   align-items: center !important; 
   flex-direction: column !important;
    color: black; 
    font-weight: bold;
     font-size: 2rem;">
  <h1 style="font-size: 3rem;">RETROSHOP</h1>
  <p>${text}</p>
  <a href="${link}">Enlace</a>
</div>`;
};

const sendMail = async (email, subject, text, link) => {
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
