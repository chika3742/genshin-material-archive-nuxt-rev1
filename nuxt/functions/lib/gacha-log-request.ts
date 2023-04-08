import {sleep} from "../utils/sleep"
import {errorResponse} from "../utils/response"
import {Wish} from "../../types/wish-history"
import {WishHistoryError} from "./wish-history-error"

export class GachaLogRequest {
  constructor(
    private readonly authKey: string,
    private readonly region: string,
  ) {}

  processedCount = 0

  async getGachaLogForWishType(wishType: string, lastId: string | null, onProgress: (count: number) => void): Promise<Wish[] | WishHistoryError> {
    const result: Wish[] = []
    let endLoop = false
    let lastIdTemp: string | null = null

    while (!endLoop) {
      const listOrResponse = await this.sendGachaLogRequest(wishType, lastIdTemp)

      // エラーが返された場合
      if (listOrResponse instanceof WishHistoryError) {
        return listOrResponse
      }

      const list = listOrResponse

      if (list.length === 0) {
        break
      }

      for (const item of list) {
        if (lastId && item.id === lastId) {
          endLoop = true
          break
        }
        result.push(item)
        this.processedCount++
      }

      onProgress(this.processedCount)

      lastIdTemp = list.splice(-1)[0].id

      await sleep(1000)
    }

    return result.reverse()
  }

  private async sendGachaLogRequest(wishType: string, lastId?: string): Promise<Wish[] | WishHistoryError> {
    const url = new URL("https://hk4e-api-os.mihoyo.com/event/gacha_info/api/getGachaLog?authkey_ver=1&lang=ja&game_biz=hk4e_global&size=20")

    url.searchParams.set("authkey", this.authKey)
    url.searchParams.set("region", this.region)
    url.searchParams.set("gacha_type", wishType)
    if (lastId) {
      url.searchParams.set("end_id", lastId)
    }

    const result = await fetch(new Request(url))

    const data = await result.json<{
      retcode: number
      message: string
      data: {
        list: any[]
      }
    }>()

    if (data.retcode !== 0) {
      switch (data.retcode) {
        case -101:
          // 認証キータイムアウト
          return new WishHistoryError(
            "Authentication key timeout",
            "authkey_timeout",
          )

        case -100:
          // 認証キー不正
          return new WishHistoryError(
            "Invalid authentication key",
            "invalid_authkey",
          )

        case -110:
          // 頻繁なリクエスト
          return new WishHistoryError(
            "Too many requests",
            "too_many_requests",
          )

        default:
          // 不明

          // miHoYo APIのレスポンスをログ出力
          console.error("Error: miHoYo API returned non-zero retcode")
          console.error(data)

          return new WishHistoryError(
            "Unknown error",
            "unknown",
          )
      }
    }

    return data.data.list.map(e => ({
      id: e.id,
      name: e.name,
      rankType: e.rank_type,
      itemType: e.item_type,
      gachaType: wishType,
      time: e.time,
    }))
  }
}
