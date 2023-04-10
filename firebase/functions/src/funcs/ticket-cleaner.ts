import functions from "firebase-functions"
import {firestoreCollections} from "../lib/firestore-collections.js"

const expiresIn = 1000 * 60 * 30 // 30 minutes

export const ticketCleaner = functions.pubsub
  .schedule("every 1 hours synchronized")
  .timeZone("Asia/Tokyo")
  .onRun(async(context) => {
    const tickets = await firestoreCollections.wishHistoryTickets.get()
    let count = 0
    for (const ticket of tickets.docs) {
      const data = ticket.data()
      if (data.timestamp + expiresIn < new Date(context.timestamp).getTime()) {
        await ticket.ref.delete()
        count++
      }
    }

    console.log(`Deleted ${count} ticket(s)`)
  })