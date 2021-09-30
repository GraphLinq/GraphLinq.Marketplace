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
