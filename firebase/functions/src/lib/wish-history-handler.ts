import {wishHistoryTicketConverter} from "../utils/wish-history-ticket-converter.js"
import {GetWishHistoryParams} from "../types/get-wish-history-params"
import {GachaLogRequest} from "./gacha-log-request.js"
import {firestoreCollections} from "./firestore-collections.js"

export class WishHistoryHandler {
  get(params: GetWishHistoryParams) {
    const doc = firestoreCollections.wishHistoryTickets.doc(params.ticketId)
      .withConverter(wishHistoryTicketConverter)

    return new GachaLogRequest(params.authKey, params.region, async(progress) => {
      await firestoreCollections.wishHistoryTickets.doc(doc.id).update({
        count: progress,
      })
    }).getGachaLogForAllWishTypes(params.lastIds).then((result) => {
      return doc.update({
        status: "done",
        count: result.length,
        result,
      })
    }).catch((error) => {
      console.error(error)

      return doc.update({
        status: "error",
        error: error.message,
      })
    })
  }
}
