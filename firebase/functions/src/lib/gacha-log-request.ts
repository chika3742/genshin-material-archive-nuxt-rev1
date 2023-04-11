import axios from "axios"
import {Wish} from "../types/shared/wish"
import {sleep} from "../utils/sleep.js"
import {GetWishHistoryError} from "../types/shared/get-wish-history-error.js"

export class GachaLogRequest {
  constructor(
    private readonly authKey: string,
    private readonly region: string,
    private readonly onProgress: (processedCount: number) => void,
  ) {}

  private processedCount = 0

  async getGachaLogForAllWishTypes(lastIds: Record<string, string>): Promise<Wish[]> {
    const result: Wish[] = []

    const wishTypes = [301, 302, 200]

    for (const wishType of wishTypes) {
      const lastId = lastIds[wishType]
      result.push(...await this.getGachaLogForWishType(wishType.toString(), lastId))
    }

    return result
  }

  async getGachaLogForWishType(wishType: string, lastId: string | null): Promise<Wish[]> {
    const result: Wish[] = []
    let endLoop = false
    let lastIdTemp: string | null = null

    while (!endLoop) {
      const list: Wish[] = await this.sendGachaLogRequest(wishType, lastIdTemp)

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

      lastIdTemp = list.splice(-1)[0].id

      this.onProgress(this.processedCount)

      await sleep(1000)
    }

    return result.reverse()
  }

  private async sendGachaLogRequest(wishType: string, lastId: string | null): Promise<Wish[]> {
    const url = new URL("https://hk4e-api-os.mihoyo.com/event/gacha_info/api/getGachaLog?authkey_ver=1&lang=ja&game_biz=hk4e_global&size=20")

    url.searchParams.set("authkey", this.authKey)
    url.searchParams.set("region", this.region)
    url.searchParams.set("gacha_type", wishType)
    if (lastId) {
      url.searchParams.set("end_id", lastId)
    }

    const result = await axios.get<{
      retcode: number
      message: string
      data: {
        list: {
          id: string
          name: string
          rank_type: string
          item_type: "キャラクター" | "武器"
          time: string
        }[]
      }
    }>(url.toString())

    if (result.data.retcode !== 0) {
      switch (result.data.retcode) {
        case -101:
          // 認証キータイムアウト
          throw new GetWishHistoryError(
            "authKeyExpired",
            "Authentication key has expired",
          )

        case -100:
          // 認証キー不正
          throw new GetWishHistoryError(
            "authKeyInvalid",
            "Authentication key is invalid",
          )

        case -110:
          // 頻繁なリクエスト
          throw new GetWishHistoryError(
            "tooManyRequests",
            "Too many requests",
          )

        default:
          // 不明

          // miHoYo APIのレスポンスをログ出力
          console.error("Error: miHoYo API returned non-zero retcode")
          console.error(result.data)

          throw new GetWishHistoryError(
            "internal",
            "Unknown error",
          )
      }
    }

    return result.data.data.list.map<Wish>(e => ({
      id: e.id,
      name: e.name,
      rankType: e.rank_type,
      itemType: e.item_type,
      gachaType: wishType,
      time: e.time,
    }))
  }
}
