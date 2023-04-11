import {WishHistoryParams} from "../types/shared/wish-history-params"
import {WishHistoryResult} from "../types/shared/wish-history-result"
import {wishHistoryTicketConverter} from "../utils/wish-history-ticket-converter.js"
import {GachaLogRequest} from "./gacha-log-request.js"
import {firestoreCollections} from "./firestore-collections.js"

export class WishHistoryHandler {
  constructor(
    private readonly params: WishHistoryParams,
  ) {}

  handle(): Promise<WishHistoryResult> {
    switch (this.params.op) {
      case "createTicket":
        return this.createTicket(this.params)
      case "status":
        return this.status(this.params)
    }
  }

  async createTicket(params: WishHistoryParams.CreateTicket): Promise<WishHistoryResult.CreateTicket> {
    // random ticket
    const doc = firestoreCollections.wishHistoryTickets.doc()
      .withConverter(wishHistoryTicketConverter)

    await doc.set({
      status: "processing",
      count: 0,
      timestamp: Date.now(),
    })

    new GachaLogRequest(params.authKey, params.region, (progress) => {
      firestoreCollections.wishHistoryTickets.doc(doc.id).update({
        count: progress,
      })
    }).getGachaLogForAllWishTypes(params.lastIds).then((result) => {
      doc.update({
        status: "done",
        count: result.length,
        result,
      })
    }).catch((error) => {
      console.error(error)

      doc.update({
        status: "error",
        error: error.message,
      })
    })

    return {
      ticket: doc.id,
    }
  }

  async status(params: WishHistoryParams.Status): Promise<WishHistoryResult.Status> {
    const doc = firestoreCollections.wishHistoryTickets.doc(params.ticket)

    const data = (await doc.get()).data()

    if (!data) {
      throw new Error("ticket not found")
    }

    return {
      status: data.status,
      count: data.count,
      timestamp: data.timestamp,
      result: data.result,
    }
  }
}
