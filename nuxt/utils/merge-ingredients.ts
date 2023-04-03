import {BookmarkableIngredient} from "~/types/bookmarkable-ingredient"

/**
 * Merges ingredients with the same id and returns a new array
 * @param ingredients The ingredients to merge
 */
export const mergeIngredients = (ingredients: BookmarkableIngredient[]): BookmarkableIngredient[][] => {
  const result: BookmarkableIngredient[][] = []
  for (const ingredient of ingredients) {
    const existing = result.find(e => e[0]?.id === ingredient.id)
    if (existing) {
      existing.push(ingredient)
    } else {
      result.push([ingredient])
    }
  }
  return result.sort((a, b) => a[0].id.localeCompare(b[0].id))
}
