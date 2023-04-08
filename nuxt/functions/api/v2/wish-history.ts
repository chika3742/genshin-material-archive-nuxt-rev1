import {errorResponse, jsonResponse} from "../../utils/response"
import {RequestStatus, Wish} from "../../../types/wish-history"
import {GachaLogRequest} from "../../lib/gacha-log-request"
import {WishHistoryError} from "../../lib/wish-history-error"

const states: Record<string, RequestStatus<Wish[]>> = {}

export const onRequest: PagesFunction = (context) => {
  cleanUp()

  if (context.request.method === "GET") {
    const url = new URL(context.request.url)

    if (!url.searchParams.has("op")) {
      return errorResponse("Missing op parameter", "invalid_argument", 400)
    }

    const op = url.searchParams.get("op")
    switch (op) {
      case "new":
        return createTicket(context.request.url)
      case "status":
        if (!url.searchParams.has("ticket")) {
          return errorResponse("Missing ticket parameter", "invalid_argument", 400)
        }
        return getTicketStatus(url.searchParams.get("ticket")!)
      default:
        return errorResponse("Invalid op", "invalid_argument", 400)
    }
  }

  return errorResponse("Invalid method", "invalid_method", 405)
}

const getWishHistory = async(authKey: string, region: string, lastIds: Record<string, string>, onProgress: (count: number) => void) => {
  const result: Wish[] = []
  const gachaTypes = [200, 301, 302]
  const request = new GachaLogRequest(authKey, region)

  for (const wishType of gachaTypes) {
    const wishTypeResult = await request.getGachaLogForWishType(wishType.toString(), lastIds[wishType.toString()], onProgress)

    // エラーが返された場合
    if (wishTypeResult instanceof WishHistoryError) {
      throw wishTypeResult
    }

    result.push(...wishTypeResult)
  }

  return result
}

const createTicket = (rawUrl: string) => {
  const {searchParams} = new URL(rawUrl)

  if (!searchParams.has("auth_key") ||
    !searchParams.has("region") ||
    JSON.parse(searchParams.get("lastIds")) === null) {
    return errorResponse("Insufficient parameters", "failed_precondition", 400)
  }

  const ticketId = Math.random().toString(36).slice(2)

  getWishHistory(
    searchParams.get("auth_key"),
    searchParams.get("region"),
    JSON.parse(searchParams.get("lastIds")),
    (count) => {
      states[ticketId].count = count
    },
  ).then((result) => {
    states[ticketId].status = "done"
    states[ticketId].result = result
    return null
  }).catch((e) => {
    states[ticketId].status = "error"

    if (e instanceof WishHistoryError) {
      states[ticketId].error = e
    } else {
      console.error(e)
    }
  })

  states[ticketId] = {
    status: "processing",
    timestamp: Date.now(),
    count: 0,
  }

  return jsonResponse({
    ticket: ticketId,
  })
}

const getTicketStatus = (ticketId: string) => {
  if (states[ticketId]) {
    return jsonResponse(states[ticketId])
  }

  return errorResponse("Invalid ticket", "invalid_argument", 400)
}

const cleanUp = () => {
  const now = Date.now()
  for (const [ticketId, state] of Object.entries(states)) {
    if (now - state.timestamp > 1000 * 60 * 30) {
      delete states[ticketId]
    }
  }
}
