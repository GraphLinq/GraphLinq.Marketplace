import ManagerProvider from 'providers/manager'
import UpdateProfileRequest from 'providers/requests/user'
import BasicResponse from 'providers/responses/basic'

export default class UserService {
  public static async updateProfile(
    profile: UpdateProfileRequest
  ): Promise<boolean> {
    try {
      const session = JSON.parse(localStorage.getItem('session') as string)
      const result: BasicResponse = await ManagerProvider.updateProfile(
        profile,
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
