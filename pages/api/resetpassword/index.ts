// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import resetpasswordrepo from '../../../temp/resetpasswordrepo'
import { nanoid } from "nanoid";

type Data = { 
  message: string
  username?: string
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
    const token = nanoid(32);
    resetpasswordrepo.tokenMap.set(username, token);
    const linkMessage:String = `A request was made to reset the password associated with your account. Click the link below to reset your password. If you did not make this request, please contact your administratior immediately. 
    <br><br> ${process.env.DOMAIN_URL}/resetpassword?username=${username}&token=${resetpasswordrepo.tokenMap.get(username)}`;
    const email:String = resetpasswordrepo.emailMap.get(username);
    const subject:String = "Reset Password";

    const sg =   fetch(`${process.env.DOMAIN_URL}/api/sendgrid`, {
      body: JSON.stringify({
        email: email,
        fullname: username,
        subject: subject,
        message: linkMessage,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

  //todo error handling

  console.log(email, username,  subject, linkMessage);
    res.status(200).json({ message: 'success', username: username });
  } else if (req.method === 'GET') {
    const { username, token  } = req.query;
    console.log(token + " " + username)
    if (token == undefined || username == undefined) {
        res.status(404).end();
      }
    const storedToken = resetpasswordrepo.tokenMap.get(username);

    console.log(storedToken);
    if (storedToken != undefined) {
        if (storedToken === token) {
          res.status(200).json({ message: 'valididated' }); 
          } else {
          res.status(401).end();
          }

        } else {
          res.status(404).end();
        }
  } else if (req.method === 'PUT') {
    const { username, token, hashedpassword, salt } = req.body;
    if (token == undefined || hashedpassword == undefined || salt == undefined) {
        res.status(404).end();
        }
    const storedToken = resetpasswordrepo.tokenMap.get(username);
    if (storedToken != undefined) {
        //todo update password in database
        if (storedToken === token) {
        resetpasswordrepo.tokenMap.delete(username);

        res.status(200).json({ message: 'success', username: username });
        } else {
            res.status(401).end();
        }
    } else {
    res.status(404);
  }

}
}
