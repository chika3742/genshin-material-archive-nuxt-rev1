import {PurposeType, TargetType} from "~/types/strings"

export interface BookmarkableIngredient {
  id: string
  quantity: number
  level: number
  targetId: string
  targetType: TargetType
  purposeType: PurposeType
}
