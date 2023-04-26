// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import resetpasswordrepo from '../../../temp/resetpasswordrepo'
import { nanoid } from "nanoid";
import { useEffect } from 'react';

type Data = { 
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method === 'POST') {
    const { username } = req.body;
    resetpasswordrepo.populateMap();
    if (req.body.username === undefined || req.body.username === "" || req.body.username === null || 
        !resetpasswordrepo.emailMap.has(req.body.username)) {
        res.status(404).end();
        return;
      }
    const token = nanoid(48);
    resetpasswordrepo.tokenMap.set(token, {username});
    
    const link = `A request was made to reset the password associated with your account. Click the link below to reset your password. If you did not make this request, please contact your administratior immediately. 
    <br><br> ${process.env.DOMAIN_URL}/resetpassword?token=${token}`;

    const email = resetpasswordrepo.emailMap.get(username);
    const subject = "Reset Password";
    const sg =   fetch(`${process.env.DOMAIN_URL}/api/sendgrid`, {
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

  //todo error 
  
  console.log(email, username,  subject, link);
    res.status(200).json({ message: 'Success' });
  } else if (req.method === 'GET') {
    const { token } = req.query;
    console.log(token)
    if (token === undefined) {
        res.status(404).end();
      }
    const data = resetpasswordrepo.tokenMap.get(token);
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
    const data = resetpasswordrepo.tokenMap.get(token);
    if (data != undefined) {
        //todo update password in database
        resetpasswordrepo.tokenMap.delete(token);
        res.status(200).json({ message: 'Success' });
        } else {
            res.status(404).end();
        }
    } else {
    res.status(404);
  }

}
