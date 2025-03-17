import express, { Request, Response } from 'express';
// import { WaitlistEmail } from '../transactional/emails/waitlist';
import { resend } from '../lib/resend';

const app = express();

app.post('/api/sendmail', async (req: Request, res: Response) => {
  try {
    const emailData = {
        from: 'onboarding@resend.dev',
        to: 'andrey.evtukh@gmail.com',
        subject: 'Hello World',
        html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    };

    const { data } = await resend.emails.send(emailData);

    return res.status(200).json({ data: data.id });
  } catch (error) {
    return console.log(error);
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
