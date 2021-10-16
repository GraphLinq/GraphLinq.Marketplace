export default interface PublishRequest {
  name: string
  description: string
  category: number
  price: number
  data: string
  youtube?: string
  images?: File[]
}
