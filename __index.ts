import {Request, Response, Application} from 'express';
import express from 'express'
import cors from "cors";
const app: Application = express();

app.use(cors(
    {
        origin: "*"
    }
))

app.post("/api/send", (req: Request, res: Response) => {
    console.error(req.headers.host)
    return res.status(200).json({ok: true}).end();
})