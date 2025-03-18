import { Resend } from 'resend';
const dotenv = require('dotenv');
dotenv.config();

export const resend = new Resend(process.env.RESEND_URL);
