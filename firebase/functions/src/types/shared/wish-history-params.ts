export type WishHistoryParams =
  | WishHistoryParams.CreateTicket
  | WishHistoryParams.Status

export namespace WishHistoryParams {
  export interface CreateTicket {
    op: "createTicket"
    authKey: string
    region: string
    lastIds: Record<string, string>
  }

  export interface Status {
    op: "status"
    ticket: string
  }
}
