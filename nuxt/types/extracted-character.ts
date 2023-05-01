import {Character} from "~/types/generated/characters.g"

export interface ExtractedCharacter extends Pick<Character, "id" | "yomi" | "weaponType" | "element" | "rarity"> {
  path: string
  name: string
  elementImageUrl: string
  imageUrl: string
}
