/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthRequest from './requests/auth'
import AuthResponse from './responses/auth'
import { ErrorResponse } from './error'
import { DecompressGraphResponse } from './responses/decompress'
import { CompressGraphRequest } from './requests/compress'
import { CompressGraphResponse } from './responses/compress'
import PublishResponse from './responses/publish'
import PublishRequest from './requests/publish'

export default class ManagerProvider {
  public static baseUrl: string =
    process.env.NEXT_PUBLIC_MANAGER_URL ?? 'http://localhost'

  public static remoteUrl = 'https://api.graphlinq.io'

  public static authRequest(authRequest: AuthRequest): Promise<AuthResponse> {
    return new Promise<AuthResponse>((resolve, reject) => {
      fetch(`${this.baseUrl}/users/auth`, {
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

  public static compressGraphData(
    request: CompressGraphRequest,
    accessToken: string
  ): Promise<CompressGraphResponse> {
    return new Promise<CompressGraphResponse>((resolve, reject) => {
      fetch(`${this.remoteUrl}/graphs/compress`, {
        method: 'post',
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res: any) => {
          res.status === 200
            ? resolve(res.json() as CompressGraphResponse)
            : reject(res.json() as ErrorResponse)
        })
        .catch((error: any) => reject(error))
    })
  }

  public static decompressGraphData(
    request: CompressGraphRequest,
    accessToken: string
  ): Promise<DecompressGraphResponse> {
    return new Promise<DecompressGraphResponse>((resolve, reject) => {
      fetch(`${this.remoteUrl}/graphs/decompress`, {
        method: 'post',
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res: any) => {
          res.status === 200
            ? resolve(res.json() as DecompressGraphResponse)
            : reject(res.json() as ErrorResponse)
        })
        .catch((error: any) => reject(error))
    })
  }

  public static publishTemplate(
    publishTemplate: PublishRequest,
    token: string
  ): Promise<PublishResponse> {
    return new Promise<PublishResponse>((resolve, reject) => {
      fetch(`${this.baseUrl}/templates`, {
        method: 'post',
        body: JSON.stringify(publishTemplate),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res: any) => {
          res.status === 200
            ? resolve(res.json() as PublishResponse)
            : reject(res.json() as ErrorResponse)
        })
        .catch((error: any) => reject(error))
    })
  }
}
