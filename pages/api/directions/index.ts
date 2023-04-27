// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import EncodeDecode from '@/temp/resetpassword/encodedecode'

type Directions = {
  start: string
  end: string
  directions: string
}

type Data = { 
  message?: string
  shortLink?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method === 'POST') {
    const start = encodeURI(req.body.start);
    const end = encodeURI(req.body.end);
    const directions = encodeURI(req.body.directions);
    const generateDate = encodeURI(new Date().toISOString().slice(0, 10)); 
    const forDate = encodeURI(req.body.forDate);
    const axios = require('axios');

    const encodeddirections = EncodeDecode.encodeDirections(start, end, directions, generateDate, forDate);
    const longLink = `${process.env.DOMAIN_URL}/directions${encodeddirections}`;
    const domain = `${process.env.FIREBASE_SHORT_LINK_DOMAIN}`;
 const shortening = axios.post(`https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.FIREBASE_API_KEY}`, {
        dynamicLinkInfo: {
            domainUriPrefix: domain,
            link: longLink
        },
        suffix: {
            option: 'SHORT'
        }
    })
    .then((response: { data:Data }) => {
        console.log(response.data.shortLink);
        res.status(200).json(response.data);
        return response.data;
    })
    .catch((error: any) => {
        console.error(error);
        return error;
    });
  } else {
    res.status(404).json({ message: 'not found' });
    return;
  }
  
}
