export default interface PublishResponse {
  success: boolean
  templateId?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any
}
