export default interface PublishRequest {
  name: string
  description: string
  category_id: number
  price: number
  data: string
  youtube?: string
  images?: string[]
}
