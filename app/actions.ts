"use server";

import { Resend } from "resend";

const resend = new Resend("re_iS94Jicb_P5nyUiNgsLKnkk75sx3tMiSN");

type State = { error: string } | { data: string };

export async function send(prevState: State, formData: FormData) {
  const email = formData.get("email") as string;

  const { data, error } = await resend.emails.send({
    from: "Vercel <vercel@resend.dev>",
    to: ["andrey.evtukh@gmail.com"],
    subject: "Join team on Vercel ANG",
    html: `<p>1111</p>`
  });

  if (error) {
    return { error: error.message };
  }

  console.log(data);

  return { data: "Email sent!" };
}
