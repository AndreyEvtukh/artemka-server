import {Request, Response, Application} from 'express';
import express from 'express'
import {resend} from '../lib/resend';
import bodyParser from "body-parser";
import fs from "fs";
import cors from "cors";

const replacePlaceholders = require('../email/replacePlaceholders');
const app: Application = express();
const dotenv = require('dotenv');
dotenv.config();

const templatePath = 'email/email-template.html';
const templateContent = fs.readFileSync(templatePath, 'utf-8');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.post('/api/send', async (req: Request, res: Response) => {
    const {name, subject, email, message} = req.body;
    if (!name || !subject || !email || !message) {
        return res.status(400).json({error: 'Missing required fields'});
    }

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const emailHtml = replacePlaceholders(templateContent, {
            name,
            subject,
            email,
            message,
        });

        const emailData = {
            from: process.env.MAILTRAP_FROM,
            to: process.env.MAILTRAP_USER,
            subject: `New message from ${name} with subject ${subject}`,
            html: emailHtml
        };
        const {error} = await resend.emails.send(emailData);

        if (error) {
            return res.status(400).json({error});
        }

        res.status(200).json({ok: true});
    } catch (error) {
        res.status(500).json({ok: false, error: error});
    }

    res.end();
});

// const server = http.createServer(app);
// server.listen(3000, () => {
//     console.log('Listening on http://localhost:3000');
// });

export default app;
