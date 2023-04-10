import {Wish} from "./wish"

export type WishHistoryResult =
  | WishHistoryResult.CreateTicket
  | WishHistoryResult.Status

export namespace WishHistoryResult {
  export interface CreateTicket {
    ticket: string
  }

  export interface Status {
    status: "processing" | "done" | "error",
    count: number,
    timestamp: number,
    result?: Wish[]
  }
}
