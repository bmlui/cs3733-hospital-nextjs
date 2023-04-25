//@ts-nocheck
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import directionsrepo from '../../../directionsrepo.js'

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
  if (req.method === 'GET') {
    console.log(req.query);
    const {id} = req.query;

    if (id === 'undefined') {
      res.status(404).end();
    }

    const directions = directionsrepo.map1.get(id);
    if (directions != undefined) {
      res.status(200).json(directions); 
    } else {
      res.status(404).end();
    }
  } else {
    res.status(404).end();
  }
}
