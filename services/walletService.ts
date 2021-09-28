import ManagerProvider from 'providers/manager'
import AuthResponse from 'providers/responses/auth'

export default class WalletService {
  public static async authWallet(addr: string, sign: string): Promise<boolean> {
    try {
      const result: AuthResponse = await ManagerProvider.authRequest({
        address: addr,
        signature: sign,
      })

      if (result) {
        localStorage.setItem(
          'session',
          JSON.stringify({ token: result.accessToken, addr: addr })
        )
      }
      return result.auth
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
