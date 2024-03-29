export type ThemeConfig = "dark" | "light" | "auto"

export type TargetType = "character" | "weapon"

export type PurposeType = "ascension" | "normalAttack" | "elementalSkill" | "elementalBurst"

export const elements = ["pyro", "hydro", "anemo", "electro", "dendro", "cryo", "geo"] as const

export type GenshinElement = typeof elements[number]

export const weaponTypes = ["sword", "claymore", "polearm", "bow", "catalyst"] as const

export type WeaponType = typeof weaponTypes[number]
