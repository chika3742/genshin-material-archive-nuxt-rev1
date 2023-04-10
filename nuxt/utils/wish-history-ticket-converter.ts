import {FirestoreDataConverter, QueryDocumentSnapshot, WithFieldValue} from "@firebase/firestore"
import {WishHistoryTicket} from "#shared/wish-history-ticket"

export const wishHistoryTicketConverter: FirestoreDataConverter<WishHistoryTicket> = {
  toFirestore(data: WishHistoryTicket): WithFieldValue<WishHistoryTicket> {
    return data
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): WishHistoryTicket {
    const data = snapshot.data()
    return {
      status: data.status,
      count: data.count,
      timestamp: data.timestamp,
      result: data.result,
      error: data.error,
    }
  },
}
