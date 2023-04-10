import admin from "firebase-admin"
import {WishHistoryTicket} from "../types/shared/wish-history-ticket"

export const wishHistoryTicketConverter: admin.firestore.FirestoreDataConverter<WishHistoryTicket> = {
  toFirestore(data: WishHistoryTicket): admin.firestore.DocumentData {
    return data
  },
  fromFirestore(snapshot: admin.firestore.QueryDocumentSnapshot): WishHistoryTicket {
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
