import {Functions, httpsCallable} from "@firebase/functions"
import {DispatchGetWishHistoryParams, DispatchGetWishHistoryResult} from "#shared/dispatch-get-wish-history"

export class WishHistoryApi {
  constructor(
    private functions: Functions,
    private url: string,
  ) {}

  currentTicket?: string

  async createTicket(lastIds: Record<string, string>, untilLatestRare: boolean): Promise<void> {
    const url = new URL(this.url)

    if (!url.searchParams.has("authkey") || !url.searchParams.has("region")) {
      throw new Error("Insufficient parameters")
    }

    const result = await httpsCallable<
      DispatchGetWishHistoryParams,
      DispatchGetWishHistoryResult
    >(this.functions, "dispatchGetWishHistory")({
      authKey: url.searchParams.get("authkey")!,
      region: url.searchParams.get("region")!,
      lastIds,
      untilLatestRare,
    })

    this.currentTicket = result.data.ticket
  }
}
