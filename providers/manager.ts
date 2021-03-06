/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthRequest from './requests/auth'
import AuthResponse from './responses/auth'
import { ErrorResponse } from './error'
import { DecompressGraphResponse } from './responses/decompress'
import { CompressGraphRequest } from './requests/compress'
import { CompressGraphResponse } from './responses/compress'
import PublishResponse from './responses/publish'
import PublishRequest from './requests/publish'
import UpdateProfileRequest from './requests/user'
import UpdateNicknameResponse from './responses/user'
import SubmitOfferRequest from './requests/offer'
import { SubmitOfferResponse } from './responses/offer'
import UpdateRequest from './requests/update'

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

  public static buyTemplate(
    userId: number,
    templateId: number,
    token: string
  ): Promise<PublishResponse> {
    return new Promise<PublishResponse>((resolve, reject) => {
      fetch(`${this.baseUrl}/users/${userId}/templates/${templateId}`, {
        method: 'post',
        //body: '',
        headers: {
          //'Content-Type': 'application/json',
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

  public static downloadTemplate(
    templateId: number,
    templateVersionId: number,
    token: string
  ): Promise<PublishResponse> {
    return new Promise<PublishResponse>((resolve, reject) => {
      fetch(
        `${this.baseUrl}/templates/${templateId}/${templateVersionId}/download`,
        {
          method: 'get',
          //body: '',
          headers: {
            //'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res: any) => {
          res.status === 200
            ? resolve(res.json() as PublishResponse)
            : reject(res.json() as ErrorResponse)
        })
        .catch((error: any) => reject(error))
    })
  }

  public static updateTemplate(
    updateTemplate: UpdateRequest,
    templateId: number,
    token: string
  ): Promise<PublishResponse> {
    return new Promise<PublishResponse>((resolve, reject) => {
      fetch(`${this.baseUrl}/templates/${templateId}/edit`, {
        method: 'put',
        body: JSON.stringify(updateTemplate),
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

  public static putTemplate(
    templateId: number,
    token: string
  ): Promise<PublishResponse> {
    return new Promise<PublishResponse>((resolve, reject) => {
      fetch(`${this.baseUrl}/templates/${templateId}/publish`, {
        method: 'put',
        //body: JSON.stringify(updateTemplate),
        headers: {
          //'Content-Type': 'application/json',
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

  public static updateProfile(
    profile: UpdateProfileRequest,
    token: string,
    id: number
  ): Promise<UpdateNicknameResponse> {
    return new Promise<UpdateNicknameResponse>((resolve, reject) => {
      fetch(`${this.baseUrl}/users/${id}/profile`, {
        method: 'put',
        body: JSON.stringify(profile),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res: any) => {
          res.status === 200
            ? resolve(res.json() as UpdateNicknameResponse)
            : reject(res.json() as ErrorResponse)
        })
        .catch((error: any) => reject(error))
    })
  }
  public static submitOffer(
    publishTemplate: SubmitOfferRequest,
    token: string
  ): Promise<SubmitOfferResponse> {
    return new Promise<SubmitOfferResponse>((resolve, reject) => {
      fetch(`${this.baseUrl}/offers`, {
        method: 'post',
        body: JSON.stringify(publishTemplate),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res: any) => {
          res.status === 200
            ? resolve(res.json() as SubmitOfferResponse)
            : reject(res.json() as ErrorResponse)
        })
        .catch((error: any) => reject(error))
    })
  }
}
