export interface DispatchGetWishHistoryParams {
  authKey: string
  region: string
  lastIds: Record<string, string>
}

export interface DispatchGetWishHistoryResult {
  ticket: string
}
