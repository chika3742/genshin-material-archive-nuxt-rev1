import admin from "firebase-admin"
import {wishHistoryTicketConverter} from "../types/wish-history-ticket.js"

export const firestoreCollections = {
  get wishHistoryTickets() {
    return admin.firestore().collection("wishHistoryTickets").withConverter(wishHistoryTicketConverter)
  },
}
