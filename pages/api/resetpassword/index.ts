// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import resetpasswordrepo from '../../../temp/resetpassword/resetpasswordrepo'
import { nanoid } from "nanoid";
import { PrismaClient } from '@prisma/client';

type Data = { 
  message: string
  username?: string
}

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method === 'POST') {
    const { username } = req.body;
    const login = await prisma.login.findFirst({where: {
      username: username
    }
    });
    if (prisma.$disconnect) await prisma.$disconnect();
  
    if (req.body.username === undefined || req.body.username === "" || req.body.username === null || 
        !login?.email) {
        res.status(404).end();
        return;
      }
    const token:String = await nanoid(32);
    resetpasswordrepo.tokenMap.set(token, username);
    const linkMessage:String = `A request was made to reset the password associated with your account. Click the link below to reset your password. If you did not make this request, please contact your administratior immediately. 
    <br><br> ${process.env.DOMAIN_URL}/resetpassword?username=${username}&token=${token}`;
    const email:String = login.email;
    const subject:String = "Reset Password";

    //comment out send email for testing
    // const sg =   fetch(`${process.env.DOMAIN_URL}/api/sendgrid`, {
    //   body: JSON.stringify({
    //     email: email,
    //     fullname: username,
    //     subject: subject,
    //     message: linkMessage,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    // });

  //todo error handling

  console.log(email, username,  subject, linkMessage);
    res.status(200).json({ message: 'success', username: username });
  } else if (req.method === 'PUT') {
    const { username, token, hashedpassword, salt } = req.body;
    if (token == undefined || hashedpassword == undefined || salt == undefined) {
      console.log("token or password or salt undefined");
        res.status(404).end();
        }

    const storedUsername:String = await resetpasswordrepo.tokenMap.get(token);
        if (storedUsername === username && storedUsername != undefined){
          try { 
            resetpasswordrepo.tokenMap.delete(username);
            const updateLogin = await prisma.login.update({
              where: {
                username: username
              },
              data: {
                password: hashedpassword,
                salt: salt
              }
            });

          } catch (error) {
            console.log(error);
          }
        
        res.status(200).json({ message: 'success', username: username });
        if (prisma.$disconnect) await prisma.$disconnect();
     
        } else {
            res.status(401).end();
        }
    }  else {
      res.status(404);
    }
}
