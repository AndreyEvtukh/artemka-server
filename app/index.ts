import express, {Application, Request, Response} from "express";
import Cors from "cors";

import dotenv from "dotenv";
import {Resend} from "resend";
import http from "http";

const app: Application = express();

dotenv.config();

const resend = new Resend("re_iS94Jicb_P5nyUiNgsLKnkk75sx3tMiSN");
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req: Request, res: Response, next) => {
    // console.error(req.body)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    );

    console.error(req.method)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});


app.post("/api/send", Cors({origin: false}), (req, res) => {
    console.log("/send")
    resend.emails.send({
        from: "Vercel <vercel@resend.dev>",
        to: ["andrey.evtukh@gmail.com"],
        subject: "Join team on Vercel ANGULAR",
        react: `<p>ПРИВЕТ</p>`,
    }).then(() => {
        return res.status(200).json({ok: true}).end();
    }).catch(error => {
        return res.status(500).json({error: error.message}).end()
    });
})

// app.get("/api/send", (req: Request, res: Response) => {
//     console.error(req.headers.host)
//     resend.emails.send({
//         from: "Vercel <vercel@resend.dev>",
//         to: ["andrey.evtukh@gmail.com"],
//         subject: "Join team on Vercel ANGULAR",
//         react: `<p>ПРИВЕТ</p>`,
//     }).then(() => {
//         return res.status(200).json({ok: true}).end();
//     }).catch(error => {
//         return res.status(500).json({error: error.message}).end()
//     });
// })

//heroku config:add \ HEROKU_OAUTH_ID=625595d0-9b97-4d31-8225-5f325e048584 \ HEROKU_OAUTH_SECRET=171bec24-9c16-47bb-8101-3f0657878877
const port = 3001;
const server = http.createServer(app);
server.listen(port, () => {
    console.log('Listening on - http://localhost:3001');
});
