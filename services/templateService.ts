import ManagerProvider from 'providers/manager'
import PublishRequest from 'providers/requests/publish'
import UpdateRequest from 'providers/requests/update'
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
      return result
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return error as any
    }
  }

  public static async purchaseTemplate(
    templateId: number
  ): Promise<PublishResponse> {
    try {
      const session = JSON.parse(localStorage.getItem('session') as string)
      const result: PublishResponse = await ManagerProvider.buyTemplate(
        session.account_id,
        templateId,
        session.token
      )
      return result
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return error as any
    }
  }

  public static async downloadTemplate(
    templateId: number,
    templateVersionId: number
  ): Promise<PublishResponse> {
    try {
      const session = JSON.parse(localStorage.getItem('session') as string)
      const result: PublishResponse = await ManagerProvider.downloadTemplate(
        templateId,
        templateVersionId,
        session.token
      )
      return result
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return error as any
    }
  }

  public static async updateTemplate(
    template: UpdateRequest,
    templateId: number
  ): Promise<PublishResponse> {
    try {
      const session = JSON.parse(localStorage.getItem('session') as string)
      const result: PublishResponse = await ManagerProvider.updateTemplate(
        template,
        templateId,
        session.token
      )
      return result
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return error as any
    }
  }
}
