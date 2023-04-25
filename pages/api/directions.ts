// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import directionsrepo from '../../directionsrepo.js'

type Directions = {
  start: string
  end: string
  directions: string
}

type Data = { 
  message: string
  link: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method === 'POST') {
    const { start, end, directions } = req.body;
    const shortLink = Math.random().toString(16).substring(2, 12);
    directionsrepo.map1.set(shortLink, {start, end, directions});
    res.status(200).json({ message: 'Success', link: shortLink })
  } else {
    res.status(404);
  }

}
