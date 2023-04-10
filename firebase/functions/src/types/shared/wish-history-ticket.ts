import {Wish} from "./wish"

export interface WishHistoryTicket {
  status: "processing" | "done" | "error",
  count: number,
  timestamp: number,
  result?: Wish[],
  error?: unknown,
}
