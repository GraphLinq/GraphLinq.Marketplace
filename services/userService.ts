import ManagerProvider from 'providers/manager'
import UpdateNicknameRequest from 'providers/requests/user'
import PublishResponse from 'providers/responses/publish'

export default class UserService {
  public static async updateNickname(
    nickname: UpdateNicknameRequest
  ): Promise<boolean> {
    try {
      const session = JSON.parse(localStorage.getItem('session') as string)
      const result: PublishResponse = await ManagerProvider.updateNickname(
        nickname,
        session.token,
        session.account_id
      )
      return result.success
    } catch (error) {
      console.error(error)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return error as any
    }
  }
}
