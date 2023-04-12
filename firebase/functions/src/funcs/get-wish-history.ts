import functions from "firebase-functions"
import {GetWishHistoryParams} from "../types/get-wish-history-params"
import {WishHistoryHandler} from "../lib/wish-history-handler.js"

export const getWishHistory = functions.region("asia-northeast1").tasks.taskQueue({
  rateLimits: {
    maxConcurrentDispatches: 5,
  },
}).onDispatch(async(data: GetWishHistoryParams) => {
  await new WishHistoryHandler().get(data)
})
