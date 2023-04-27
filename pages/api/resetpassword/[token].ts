// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import resetpasswordrepo from '../../../temp/resetpassword/resetpasswordrepo'

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
  } 
res.status(404);
}
