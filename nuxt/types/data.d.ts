declare module "~/assets/data/characters.yaml" {
  import {Character} from "~/types/generated/characters.g";
  const characters: Character[]
  export default characters
}

declare module "~/assets/data/character-ingredients.yaml" {
  import {CharacterIngredients} from "~/types/generated/character-ingredients.g";
  const characterIngredients: CharacterIngredients
  export default characterIngredients
}

declare module "~/assets/data/weapons.yaml" {
  import {Weapon} from "~/types/generated/weapons.g";
  const weapons: Weapon[]
  export default weapons
}

declare module "~/assets/data/weapon-ingredients.yaml" {
  import {WeaponIngredients} from "~/types/generated/weapon-ingredients.g";
  const weaponIngredients: WeaponIngredients
  export default weaponIngredients
}

declare module "~/assets/data/release-notes.yaml" {
  import {ReleaseNotes} from "~/types/generated/release-notes.g";
  const releaseNotes: ReleaseNotes
  export default releaseNotes
}