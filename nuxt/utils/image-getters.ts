import {GenshinElement} from "~/types/strings"

export const getElementImage = (element: GenshinElement) => {
  return new URL(`../assets/img/elements/${element}.webp`, import.meta.url).toString()
}

export const getCharacterImage = (characterId: string, variant: "full" | "small") => {
  if (variant === "full") {
    return new URL(`../assets/img/characters/${characterId}.webp`, import.meta.url).toString()
  } else {
    return new URL(`../assets/img/characters/${characterId}_small.webp`, import.meta.url).toString()
  }
}
