// import {resend} from "./lib/resend";
//
// const send = async (req, res) => {
//     console.error(999)
//     const {method} = req;
//
//     switch (method) {
//         case 'POST': {
//             const data = await resend.emails.send({
//                 from: 'aaa@aaa.xxx',
//                 to: ['delivered@resend.dev'],
//                 subject: 'Waitlist',
//                 text: 'Hello World',
//             });
//
//             return res.status(200).send({data: {}});
//         }
//         default:
//             res.setHeader('Allow', ['POST']);
//             res.status(405).end(`Method ${method} Not Allowed`);
//     }
// };
//
// export default send;


import express, { Request, Response } from "express";
import { Resend } from "resend";

const app = express();
const resend = new Resend("re_123456789");

app.get("/", async (req: Request, res: Response) => {
    const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["delivered@resend.dev"],
        subject: "hello world",
        html: "<strong>it works!</strong>",
    });

    if (error) {
        return res.status(400).json({ error });
    }

    res.status(200).json({ data });
});

app.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
});