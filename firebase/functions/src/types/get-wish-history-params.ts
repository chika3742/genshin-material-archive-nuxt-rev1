import {DispatchGetWishHistoryParams} from "./shared/dispatch-get-wish-history"

export interface GetWishHistoryParams extends DispatchGetWishHistoryParams {
  ticketId: string
}
