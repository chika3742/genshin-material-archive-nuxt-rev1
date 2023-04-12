export interface DispatchGetWishHistoryParams {
  authKey: string
  region: string
  lastIds: Record<string, string>
  untilLatestRare: boolean
}

export interface DispatchGetWishHistoryResult {
  ticket: string
}
