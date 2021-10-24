export default interface UpdateRequest {
  name?: string | undefined
  description?: string | undefined
  category_id?: number | undefined
  template_cost?: number | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
  version_id?: number
}
