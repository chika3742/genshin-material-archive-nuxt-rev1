import functions from "firebase-functions"
import {DispatchGetWishHistoryParams} from "../types/shared/dispatch-get-wish-history.js"

export const getWishHistory = functions.region("asia-northeast1").tasks.taskQueue({
  rateLimits: {
    maxConcurrentDispatches: 5,
  },
}).onDispatch((data: DispatchGetWishHistoryParams) => {
  console.log(data)
})
