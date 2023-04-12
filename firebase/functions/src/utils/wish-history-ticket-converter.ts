import admin from "firebase-admin"
import {WishHistoryTicket} from "../types/shared/wish-history-ticket"

export const wishHistoryTicketConverter: admin.firestore.FirestoreDataConverter<WishHistoryTicket> = {
  toFirestore(data: WishHistoryTicket): admin.firestore.DocumentData {
    return data
  },
  fromFirestore(snapshot: admin.firestore.QueryDocumentSnapshot): WishHistoryTicket {
    return snapshot.data() as WishHistoryTicket
  },
}
