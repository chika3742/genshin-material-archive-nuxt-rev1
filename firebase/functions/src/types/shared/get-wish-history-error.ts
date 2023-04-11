export type GetWishHistoryErrorCode =
  | "authKeyExpired"
  | "authKeyInvalid"
  | "tooManyRequests"
  | "internal"

export class GetWishHistoryError extends Error {
  constructor(
    public readonly code: GetWishHistoryErrorCode,
    public readonly message: string,
  ) {
    super(message)
  }
}
