/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthRequest from './requests/auth'
import AuthResponse from './responses/auth'
import { ErrorResponse } from './error'

export default class ManagerProvider {
  public static baseUrl: string =
    process.env?.NEXT_PUBLIC_MANAGER_URL ?? 'http://localhost'

  public static authRequest(authRequest: AuthRequest): Promise<AuthResponse> {
    return new Promise<AuthResponse>((resolve, reject) => {
      fetch(`${this.baseUrl}/wallets/auth`, {
        method: 'post',
        body: JSON.stringify(authRequest),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res: any) => {
          res.status === 200
            ? resolve(res.json() as AuthResponse)
            : reject(res.json() as ErrorResponse)
        })
        .catch((error: any) => reject(error))
    })
  }
}
