// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import resetpasswordrepo from '../../../temp/resetpasswordrepo'
import { nanoid } from "nanoid";

type Data = { 
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method === 'POST') {
    const { username } = req.body;
    if (req.body.username === undefined) {
        res.status(404).end();
      }
    const token = nanoid(48);
    resetpasswordrepo.map1.set(token, {username});
    
    const link = `https://teamc.blui.co/resetpassword?token=${token}`;
    const email = "blui@wpi.edu";
    const subject = "Reset Password";

    const sg =   fetch("/api/sendgrid", {
      body: JSON.stringify({
        email: email,
        fullname: username,
        subject: subject,
        message: link,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    // const { error } =  sg.json();
    // if (error) {
    //   console.log(error);
    //   return;
    // }
  console.log(email, username,  subject, link);
    res.status(200).json({ message: 'Success' })
  } else if (req.method === 'GET') {
    const { token } = req.query;
    if (token === undefined) {
        res.status(404).end();
      }
    const data = resetpasswordrepo.map1.get(token);
    if (data != undefined) {
        res.status(200).json(data); 
        } else {
          res.status(404).end();
        }
  } else if (req.method === 'PUT') {
    const { token, hashedpassword, salt } = req.body;
    if (token === undefined || hashedpassword === undefined || salt === undefined) {
        res.status(404).end();
        }
    const data = resetpasswordrepo.map1.get(token);
    if (data != undefined) {
        //todo update password in database
        resetpasswordrepo.map1.delete(token);
        res.status(200).json({ message: 'Success' });
        } else {
            res.status(404).end();
        }
    } else {
    res.status(404);
  }

}
