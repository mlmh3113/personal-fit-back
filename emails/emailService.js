import nodemailer from "nodemailer";
import { google } from "googleapis";

const sendEmailVerification = async (name , email, token) => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.ID_CLIENT,
    process.env.SECRET_CLIENT,
    process.env.REDIRECT_URI
  );

  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      type: "OAuth2",
      user: "mlmh3113@gmail.com",
      clientId: process.env.ID_CLIENT,
      clientSecret: process.env.SECRET_CLIENT,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: oAuth2Client.getAccessToken(),
    },
  });

  const mail = await transporter.sendMail({
    from: "Personal Fitness <mlmh3113@gmail.com>",
    to: email,
    subject: "Verificación de correo",
    text: `Personal Fitness: Confirma tu cuenta`,
    html: `
            <h1>Personal Fitness</h1>
            <h2>Confirma tu cuenta</h2>

            <p>Hola: ${name}  Confirma tu cuenta en Personal Fitness</p>
            
            <p>Haz click en el siguiente enlace para verificar tu cuenta:</p>

             <a href="${process.env.FRONTEND_URL}/students/confirm-account/${token}">Verificar cuenta</a>

            <p>Si tu no creaste esta cuenta, ignora este correo</p>
        `,
  });

  console.log(`Mensaje enviado: ${mail.messageId}`);
 
};

export { sendEmailVerification };
