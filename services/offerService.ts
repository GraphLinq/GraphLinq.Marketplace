import ManagerProvider from 'providers/manager'
import SubmitOfferRequest from 'providers/requests/offer'
import BasicResponse from 'providers/responses/basic'

export default class OfferService {
  public static async submitOffer(offer: SubmitOfferRequest): Promise<boolean> {
    try {
      const session = JSON.parse(localStorage.getItem('session') as string)
      const result: BasicResponse = await ManagerProvider.submitOffer(
        offer,
        session.token
      )
      return result.success
    } catch (error) {
      console.error(error)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return error as any
    }
  }
}
