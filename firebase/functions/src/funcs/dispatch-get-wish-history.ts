import functions from "firebase-functions"
import {getFunctions} from "firebase-admin/functions"
import {DispatchGetWishHistoryParams, DispatchGetWishHistoryResult} from "../types/shared/dispatch-get-wish-history"
import {firestoreCollections} from "../lib/firestore-collections.js"
import {wishHistoryTicketConverter} from "../utils/wish-history-ticket-converter.js"
import {GetWishHistoryParams} from "../types/get-wish-history-params"

export const dispatchGetWishHistory = functions.region("asia-northeast1").https
  .onCall((data: DispatchGetWishHistoryParams, context): Promise<DispatchGetWishHistoryResult> => {
    if (process.env.FIREBASE_DEBUG_MODE !== "true" && !context.app) {
      throw new functions.https.HttpsError("failed-precondition", "Invalid App Check token.")
    }

    // https://github.com/firebase/firebase-admin-node/blob/master/src/utils/index.ts#L293
    const queue = getFunctions().taskQueue<GetWishHistoryParams>("locations/asia-northeast1/functions/getWishHistory")

    const doc = firestoreCollections.wishHistoryTickets.doc()
      .withConverter(wishHistoryTicketConverter)

    return doc.set({
      status: "processing",
      count: 0,
      timestamp: Date.now(),
    }).then(() => {
      return queue.enqueue({
        authKey: data.authKey,
        region: data.region,
        lastIds: data.lastIds,
        ticketId: doc.id,
        untilLatestRare: data.untilLatestRare,
      })
    }).then(() => ({
      ticket: doc.id,
    })).catch(async(error) => {
      console.error(error)
      await doc.update({
        status: "error",
        errorCode: "internal",
      })

      return {
        ticket: doc.id,
      }
    })
  })
