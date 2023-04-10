export interface Wish {
  id: string
  gachaType: string
  time: string
  name: string
  itemType: "キャラクター" | "武器"
  rankType: string
}

export interface RequestStatus<T> {
  status: "processing" | "done" | "error",
  count: number,
  timestamp: number,
  result?: T,
  error?: unknown,
}
