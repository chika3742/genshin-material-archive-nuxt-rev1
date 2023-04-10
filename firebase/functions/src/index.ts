import admin from "firebase-admin"

admin.initializeApp()

export * from "./funcs/on-user-delete.js"
export * from "./funcs/wish-history.js"
export * from "./funcs/ticket-cleaner.js"
