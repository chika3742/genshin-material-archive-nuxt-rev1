import functions from "firebase-functions"
import {WishHistoryParams} from "../types/shared/wish-history-params"
import {WishHistoryHandler} from "../lib/wish-history-handler.js"

export const wishHistory = functions.region("asia-northeast1").https.onCall((data: WishHistoryParams, context) => {
  if (!context.app) {
    throw new functions.https.HttpsError("failed-precondition", "Invalid App Check token.")
  }

  return new WishHistoryHandler(data).handle()
})
