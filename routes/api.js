const express = require('express');
// const Resend = require('resend');

// import { Resend } from 'resend';

const app = express();
const nodemailer = require('nodemailer');
const replacePlaceholders = require('../email/replacePlaceholders');
// const allowCors = require('./allowCors');
const fs = require("fs");
const router = express.Router();
const cors = require('cors');

const templatePath = 'email/email-template.html';
const templateContent = fs.readFileSync(templatePath, 'utf-8');


// const corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// console.error(3)
// app.get('/', (req, res) => {
//     console.error(4)
//     res.status(200)
// });
//
console.error(4)
// router.options("/sendmail", cors(corsOptions));


import { Resend } from 'resend';

router.post('/sendmail', (req, res) => {
    console.error(2222)
    const resend = new Resend('re_iS94Jicb_P5nyUiNgsLKnkk75sx3tMiSN');
    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'andrey.evtukh@gmail.com',
        subject: 'Hello World',
        html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    }).then(() => {
        res.status(200).json({ok: true, statusText: 'email_successfully_sent'});
    });

    res.end();
})

router.post('/sendmail.111', async (req, res) => {
    console.error(1)
    try {
        const {name, subject, email, message} = req.body;
        if (!name || !subject || !email || !message) {
            return res.status(400).json({error: 'Missing required fields'});
        }

        const attachmentData = req.file ? {
            filename: req.file.originalname,
            content: req.file.buffer
        } : null;

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            // secure: true,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: atob(process.env.MAILTRAP_PASS)
            }
        });

        const emailHtml = replacePlaceholders(templateContent, {name, subject, email, message});
        const mailOptions = {
            from: process.env.MAILTRAP_FROM,
            to: [process.env.MAILTRAP_USER],
            subject: `New message from ${name} with subject ${subject}`,
            text: `New 55 message \n\nSubject: ${subject}\nFrom: ${name}\nEmail: ${email}\n\nMessage:\n\n${message}`,
            html: emailHtml
            // attachments: attachmentData ? [attachmentData] : []
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        res.status(200).json({ok: true, statusText: 'email_successfully_sent'});
    } catch (error) {
        res.status(5001).json({error: 'error_sending_email'});
    }

    res.end();
});

module.exports = router;
