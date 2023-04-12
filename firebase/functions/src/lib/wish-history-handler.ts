import {wishHistoryTicketConverter} from "../utils/wish-history-ticket-converter.js"
import {GetWishHistoryParams} from "../types/get-wish-history-params"
import {GetWishHistoryError} from "../types/shared/get-wish-history-error.js"
import {GachaLogRequest} from "./gacha-log-request.js"
import {firestoreCollections} from "./firestore-collections.js"

export class WishHistoryHandler {
  get(params: GetWishHistoryParams) {
    const doc = firestoreCollections.wishHistoryTickets.doc(params.ticketId)
      .withConverter(wishHistoryTicketConverter)

    return new GachaLogRequest(params, async(progress) => {
      await firestoreCollections.wishHistoryTickets.doc(doc.id).update({
        count: progress,
      })
    }).getGachaLogForAllWishTypes().then((result) => {
      return doc.update({
        status: "done",
        count: result.length,
        result,
      })
    }).catch((error) => {
      console.error(error)

      if (error instanceof GetWishHistoryError) {
        return doc.update({
          status: "error",
          errorCode: error.code,
        })
      } else {
        return doc.update({
          status: "error",
          errorCode: "internal",
        })
      }
    })
  }
}
