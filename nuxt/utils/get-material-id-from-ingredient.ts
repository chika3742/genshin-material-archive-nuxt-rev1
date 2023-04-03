import {Ingredient} from "~/types/generated/character-ingredients.g"
import characters from "~/assets/data/characters.yaml"

export function getMaterialIdFromIngredient(ingredient: Ingredient, targetId: string): string | null {
  if ("id" in ingredient) {
    return ingredient.id + (ingredient.craftLevel ? `-${ingredient.craftLevel}` : "")
  } else {
    const character = characters.find(e => e.id === targetId)
    if (!character) {
      throw new Error(`Target with id ${targetId} not found`)
    }
    if (ingredient.exceptions && ingredient.exceptions[targetId]) {
      const id = ingredient.exceptions[targetId]
      if (typeof id === "boolean") {
        return null
      }
      return id
    }
    const baseIngredientId = character.materials[ingredient.type]
    if (!baseIngredientId) {
      return null
    }
    return baseIngredientId + (ingredient.craftLevel ? `-${ingredient.craftLevel}` : "")
  }
}
