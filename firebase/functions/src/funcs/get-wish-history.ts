import functions from "firebase-functions"
import {GachaLogRequest} from "../lib/gacha-log-request.js"
import {GetWishHistoryParams} from "../types/get-wish-history-params"
import {firestoreCollections} from "../lib/firestore-collections.js"

export const getWishHistory = functions.region("asia-northeast1").tasks.taskQueue({
  rateLimits: {
    maxConcurrentDispatches: 5,
  },
}).onDispatch((data: GetWishHistoryParams) => {
  return new GachaLogRequest(data.authKey, data.region, (processedCount) => {
    return firestoreCollections.wishHistoryTickets.doc(data.ticketId).update({
      count: processedCount,
    })
  }).getGachaLogForAllWishTypes(data.lastIds).then()
})
