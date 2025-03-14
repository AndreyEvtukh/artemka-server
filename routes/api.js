const express = require('express');
const nodemailer = require('nodemailer');
const replacePlaceholders = require('../email/replacePlaceholders');
const fs = require("fs");
const router = express.Router();
const cors = require('cors');

const templatePath = 'email/email-template.html';
const templateContent = fs.readFileSync(templatePath, 'utf-8');

const corsOptions = {
    origin: true,
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
console.error(3)
router.get('/', (req, res) => {
    console.error(4)
    res.status(200)
});

router.options("/sendmail", cors());
router.post('/sendmail', async (req, res) => {
    try {
        console.error(1)
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
            secure: true,
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
            html: emailHtml,
            attachments: attachmentData ? [attachmentData] : []
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        res.status(200).json({ok: true, statusText: 'email_successfully_sent'});
    } catch (error) {
        res.status(500).json({error: 'error_sending_email'});
    }

    res.end();
});

module.exports = router;
