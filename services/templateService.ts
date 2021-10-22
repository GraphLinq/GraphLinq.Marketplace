import ManagerProvider from 'providers/manager'
import PublishRequest from 'providers/requests/publish'
import PublishResponse from 'providers/responses/publish'

export default class TemplateService {
  public static async publishTemplate(
    template: PublishRequest
  ): Promise<PublishResponse> {
    try {
      const session = JSON.parse(localStorage.getItem('session') as string)
      const result: PublishResponse = await ManagerProvider.publishTemplate(
        template,
        session.token
      )
      console.log(result)
      return result
    } catch (error) {
      console.error(error)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return error as any
    }
  }
}
