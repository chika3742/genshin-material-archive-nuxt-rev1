import {Wish} from "./wish"
import {GetWishHistoryErrorCode} from "./get-wish-history-error"

export interface WishHistoryTicket {
  status: "processing" | "done" | "error",
  count: number,
  timestamp: number,
  result?: Wish[],
  errorCode?: GetWishHistoryErrorCode,
}
