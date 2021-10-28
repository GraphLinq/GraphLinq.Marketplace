export enum templateCategoryId {
  DEFI = 1,
  MONITORING = 2,
  WEB_API = 3,
  BOT_TELEGRAM = 4,
  BOT_DISCORD = 5,
}

export const ALL_CATEGORY_IDS: templateCategoryId[] = [
  templateCategoryId.DEFI,
  templateCategoryId.MONITORING,
  templateCategoryId.WEB_API,
  templateCategoryId.BOT_TELEGRAM,
  templateCategoryId.BOT_DISCORD,
]

export const CATEGORY_IDS = [
  templateCategoryId.DEFI,
  templateCategoryId.MONITORING,
  templateCategoryId.WEB_API,
  templateCategoryId.BOT_TELEGRAM,
  templateCategoryId.BOT_DISCORD,
] as const

export type categoryId = typeof CATEGORY_IDS[number]

export interface CategoryInfo {
  readonly name: string
  readonly longName: string
  readonly slug: string
}

export type CategoryInfos = { readonly [category: number]: CategoryInfo } & {
  readonly [category in categoryId]: CategoryInfo
}

export const CATEGORY_INFO: CategoryInfos = {
  [templateCategoryId.DEFI]: {
    name: 'DeFi',
    longName: 'Decentralized Finance',
    slug: 'decentralized-finance',
  },
  [templateCategoryId.MONITORING]: {
    name: 'Monitoring',
    longName: 'Monitoring',
    slug: 'monitoring',
  },
  [templateCategoryId.WEB_API]: {
    name: 'Web API',
    longName: 'Web API',
    slug: 'web-api',
  },
  [templateCategoryId.BOT_TELEGRAM]: {
    name: 'Bot Telegram',
    longName: 'Bot Telegram',
    slug: 'bot-telegram',
  },
  [templateCategoryId.BOT_DISCORD]: {
    name: 'Bot Discord',
    longName: 'Bot Discord',
    slug: 'bot-discord',
  },
}

/* export interface TemplateCardProps {
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
} */

export interface Templates {
  id: number
  name: string
  description: string
  template_cost: number
  category: Category
  user?: User
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  likes: any[]
  assets: Asset[]
  versions: Version[]
  rating: Rating
  favoriteCount: number
}

interface Asset {
  id: number
  type: string
  data: string
}

interface Category {
  id: number
  name: string
  long_name: string
  slug: string
}

interface User {
  id: number
  name: string
  email: string
  publisherName: string
  publicAddress: string
  is_admin: boolean
}

interface Version {
  id: number
  current_version: string
  execution_cost: string
  createdAt: string
  updatedAt: string
}

interface Rating {
  average: number
  count: number
}
