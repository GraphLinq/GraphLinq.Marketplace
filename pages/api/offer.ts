import { OfferCard } from '@/components/OfferCard'
import type { NextApiRequest, NextApiResponse } from 'next'

const offerMock = {
  offerId: 0,
  offerTitle: 'Test offer title',
  offerDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam gravida eros dolor, ullamcorper gravida orci posuere et. Quisque malesuada, sapien vitae consectetur commodo, velit erat feugiat odio, eget pellentesque diam magna nec risus. Pellentesque id massa quis felis commodo fringilla ut ut tellus. Proin viverra vehicula quam, ut dapibus nulla consequat aliquet. Vivamus eget nisl nisi. Aliquam ut varius diam. Donec sit amet fermentum tortor. Cras ac commodo erat, id porta lorem. Suspendisse potenti. Duis congue orci nulla, ac varius lorem ultrices quis. Pellentesque tempus mauris nec eros rhoncus dapibus.',
  offerAuthorId: 0,
  offerPrice: 2500,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<OfferCard[]>
) {
  const offersList = Array(3).fill(offerMock)
  res.status(200).json(offersList)
}
