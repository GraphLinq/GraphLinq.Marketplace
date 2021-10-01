import ManagerProvider from 'providers/manager'
import { CompressGraphResponse } from 'providers/responses/compress'
import { DecompressGraphResponse } from 'providers/responses/decompress'

export default class GraphService {
  public static async compressGraph(toCompress: string): Promise<string> {
    try {
      const session = JSON.parse(localStorage.getItem('session') as string)
      const result: CompressGraphResponse =
        await ManagerProvider.compressGraphData(
          { data: toCompress },
          session.token
        )
      return result.compressed
    } catch (error) {
      console.error(error)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return error as any
    }
  }

  public static async decompressGraph(toDecompress: string): Promise<string> {
    try {
      const session = JSON.parse(localStorage.getItem('session') as string)
      const result: DecompressGraphResponse =
        await ManagerProvider.decompressGraphData(
          { data: toDecompress },
          session.token
        )
      return result.decompressed
    } catch (error) {
      console.error(error)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return error as any
    }
  }
}
