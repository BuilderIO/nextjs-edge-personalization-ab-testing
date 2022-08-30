import commerce from '@lib/api/commerce'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  commerce
    .getProduct({
      variables: { slug: req.query.slug },
    })
    .then(({ product }: any) => {
      res.send({ product })
    })
}
