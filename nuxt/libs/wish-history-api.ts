import {Functions, httpsCallable} from "@firebase/functions"
import {WishHistoryParams} from "#shared/wish-history-params"
import {WishHistoryResult} from "#shared/wish-history-result"

export class WishHistoryApi {
  constructor(
    private functions: Functions,
    private url: string,
  ) {}

  currentTicket?: string

  async createTicket(lastIds: Record<string, string>): Promise<void> {
    const url = new URL(this.url)

    if (!url.searchParams.has("authkey") || !url.searchParams.has("region")) {
      throw new Error("Insufficient parameters")
    }

    const result = await httpsCallable<
      WishHistoryParams.CreateTicket,
      WishHistoryResult.CreateTicket
    >(this.functions, "wishHistory")({
      op: "createTicket",
      authKey: url.searchParams.get("authkey")!,
      region: url.searchParams.get("region")!,
      lastIds,
    })

    this.currentTicket = result.data.ticket
  }

  async getStatus(): Promise<WishHistoryResult.Status> {
    if (!this.currentTicket) {
      throw new Error("No ticket")
    }

    return (await httpsCallable<
      WishHistoryParams.Status,
      WishHistoryResult.Status
    >(this.functions, "wishHistory")({
      op: "status",
      ticket: this.currentTicket,
    })).data
  }
}
