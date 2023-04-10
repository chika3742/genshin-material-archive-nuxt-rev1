import {Wish} from "#shared/wish"

export const useWishesStore = defineStore("wishes", {
  state() {
    return {
      wishes: [] as Wish[],
    }
  },
  getters: {
    lastIds(): Record<string, string> {
      const result = {} as Record<string, string>
      for (const wish of [...this.wishes].reverse()) {
        if (!result[wish.gachaType]) {
          result[wish.gachaType] = wish.id
        }
      }
      return result
    },
  },
  persist: true,
})
