import {Request, Response, Application} from 'express';
import express from 'express'
// import {resend} from './lib/resend';
import bodyParser from "body-parser";
import fs from "fs";
import cors from "cors";
import http from "http";

const replacePlaceholders = require('./email/replacePlaceholders');
const app: Application = express();
require('dotenv').config();

const templatePath = 'email/email-template.html';
const templateContent = fs.readFileSync(templatePath, 'utf-8');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// (async function() {
//     try {
//         const data = await resend.emails.send({
//             from: 'Acme <onboarding@resend.dev>',
//             to: [process.env.MAILTRAP_USER],
//             subject: 'Hello World',
//             html: '<strong>It works!</strong>'
//         });
//
//         console.log(data);
//     } catch (error) {
//         console.error(error);
//     }
// })();
// app.use(cors())
// app.use(cors({
//     origin: ['https://artemka-dev.vercel.app', 'https://artemka-server.vercel.app'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Authorization'],
//     credentials: true,
// }));

app.use("/api/send", (req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4201');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    );
    // resend.emails.send({
    //     from: 'Acme <onboarding@resend.dev>',
    //     to: [process.env.MAILTRAP_USER],
    //     subject: 'Hello World',
    //     html: '<strong>It works!</strong>'
    // });

    next();
});

app.post('/api/send', async (req: Request, res: Response) => {
    console.error(111)
    resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [process.env.MAILTRAP_USER],
        subject: 'Hello World',
        html: '<strong>It works!</strong>'
    });
})


// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'GET,OPTIONS,PATCH,DELETE,POST,PUT',
//     );
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
//     );
//
//     if (req.method === 'OPTIONS') {
//         return res.status(200).end();
//     }
//     next();
// });

// app.post('/api/send', async (req: Request, res: Response) => {
//     resend.emails.send({
//                 from: 'Acme <onboarding@resend.dev>',
//                 to: [process.env.MAILTRAP_USER],
//                 subject: 'Hello World',
//                 html: '<strong>It works!</strong>'
//             });
//     const {name, subject, email, message} = req.body;
//
//     if (!name || !subject || !email || !message) {
//         return res.status(400).json({error: 'Missing required fields'});
//     }
//     console.error(121212)
//     try {
//         const emailHtml = replacePlaceholders(templateContent, {
//             name,
//             subject,
//             email,
//             message,
//         });
//
//         const emailData = {
//             from: process.env.MAILTRAP_FROM,
//             to: process.env.MAILTRAP_USER,
//             subject: `New message from ${name} with subject ${subject}`,
//             html: emailHtml
//         };
//         // const {error} = await resend.emails.send(emailData);
//
//         // if (error) {
//         //     return res.status(400).json({error});
//         // }
//
//         res.status(200).json({ok: true});
//     } catch (error) {
//         res.status(500).json({ok: false, error: error});
//     }
//
//     res.end();
// });

const server = http.createServer(app);
server.listen(3000, () => {
    console.log('Listening on - http://localhost:3000');
    // resend.emails.send({
    //         from: 'Acme <onboarding@resend.dev>',
    //         to: [process.env.MAILTRAP_USER],
    //         subject: 'Hello World',
    //         html: '<strong>It works!</strong>'
    //     });
});

export default app;
