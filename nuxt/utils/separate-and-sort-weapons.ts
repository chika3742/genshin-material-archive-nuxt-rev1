import {Weapon} from "~/types/generated/weapons.g"

export const separateAndSortWeapons = (weapons: Weapon[]): Weapon[][] => {
  const result: Weapon[][] = []

  for (const weapon of weapons) {
    const list = result.find(e => e[0].type === weapon.type) || []

    list.push(weapon)

    if (list.length === 1) {
      result.push(list)
    }
  }

  for (const list of result) {
    list.sort((a, b) => b.rarity - a.rarity)
  }

  return result
}
