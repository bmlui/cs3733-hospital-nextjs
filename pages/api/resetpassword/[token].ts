// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import resetpasswordrepo from '../../../temp/resetpassword/resetpasswordrepo'
import { use } from 'react'

type Data = { 
  message: string
  username?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
   if (req.method === 'GET') {
    const { username, token  } = req.query;
    if (token == undefined || username == undefined) {
        res.status(404).end();
      }
    const storedUsername = resetpasswordrepo.tokenMap.get(token);
    if (storedUsername != undefined) {
        if (storedUsername === username) {
          res.status(200).json({ message: 'valididated' }); 
          } else {
          res.status(401).end();
          }
        } else {
          res.status(404).end();
        }
  } 
res.status(404);
}
