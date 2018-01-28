import * as nodemailer from "nodemailer";

let smtpConfig = {
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: 'office@enkidoo.de',
        pass: 'Chelsea1'
    }
};

let transporter = nodemailer.createTransport(smtpConfig);

export const message = {
    from: 'office@enkidoo.de',
    subject: 'Verification',
    to: "",
    html: ""
};

// verify connection configuration
transporter.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});

export default transporter;