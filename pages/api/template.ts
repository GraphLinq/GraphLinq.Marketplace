import type { NextApiRequest, NextApiResponse } from 'next'

const thumbnail = '/images/thumbnail_small.png'
const templateMockData = {
  templateId: 0,
  templateThumbnail: thumbnail,
  images: [
    {
      imageUrl: 'https://www.youtube.com/embed/fuwFbM408Ys',
      type: 'youtube',
    },
    {
      imageUrl: '/images/template-image-example.png',
      type: 'screenshot',
    },
  ],
  title: 'Graph Template Title',
  description: `Watch an ERC-20 smart contract new transactions and deposit, save in the Redis key/value storage any deposited amount from new addresses and report activity on a discord webhook channel.<br><br>Template description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  downloadSize: '186301920',
  slug: 'template-0',
  dateRelease: '2021-05-10T12:11:13Z',
  dateLastUpdate: '2021-05-21T12:11:13Z',
  publisher: {
    id: 1234,
    name: 'fafifox',
    supportEmail: 'team@graphlinq.io',
    supportUrl: 'https://graphlinq.io/',
  },
  category: {
    id: 1,
    name: 'DeFi',
    longName: 'Decentralized Finance',
    slug: 'decentralized-finance',
  },
  price: {
    price: 250,
    isFree: false,
  },
  rating: {
    average: 4,
    count: 61,
  },
  favoriteCount: 51,
}
export interface TemplateCard {
  templateId: number
  templateThumbnail: string
  images: Images[]
  title: string
  description: string
  downloadSize: string
  slug: string
  publisher: Publisher
  category: Category
  price: Price
  rating: Rating
  favoriteCount: number
}

interface Images {
  imageUrl: string
  type: string
}

interface Publisher {
  id: number
  name: string
  supportEmail: string
  supportUrl: string
}

interface Category {
  id: number
  name: string
  longName: string
  slug: string
}

interface Price {
  price: number
  isFree: boolean
}

interface Rating {
  average: number
  count: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TemplateCard[]>
) {
  const templateList = Array(3).fill(templateMockData)
  res.status(200).json(templateList)
}
