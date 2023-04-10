import admin from "firebase-admin"
import {Wish} from "./shared/wish"

export interface WishHistoryTicket {
  status: "processing" | "done" | "error",
  count: number,
  timestamp: number,
  result?: Wish[],
  error?: unknown,
}

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
