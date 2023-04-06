import {Ingredient} from "~/types/generated/character-ingredients.g"
import {Character} from "~/types/generated/characters.g"
import {Weapon} from "~/types/generated/weapons.g"

export function getMaterialIdFromIngredient(ingredient: Ingredient, target: Character | Weapon): string | null {
  if ("id" in ingredient) {
    return ingredient.id + (ingredient.craftLevel ? `-${ingredient.craftLevel}` : "")
  } else {
    if (ingredient.exceptions && ingredient.exceptions[target.id]) {
      const id = ingredient.exceptions[target.id]
      if (typeof id === "boolean") {
        return null
      }
      return id
    }
    const baseIngredientId = (target.materials as unknown as Record<string, string>)[ingredient.type]
    if (!baseIngredientId) {
      return null
    }
    return baseIngredientId + (ingredient.craftLevel ? `-${ingredient.craftLevel}` : "")
  }
}
