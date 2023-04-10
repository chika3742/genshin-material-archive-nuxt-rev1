import admin from "firebase-admin"
import {wishHistoryTicketConverter} from "../utils/wish-history-ticket-converter.js"

export const firestoreCollections = {
  get wishHistoryTickets() {
    return admin.firestore().collection("wishHistoryTickets").withConverter(wishHistoryTicketConverter)
  },
}
