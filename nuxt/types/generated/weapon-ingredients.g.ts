/* This file was generated. DO NOT edit by hand. */

export type WeaponIngredients = RarityIngredients[];

export interface RarityIngredients {
  rarity: number;
  levels: LevelIngredients[];
}
export interface LevelIngredients {
  level: number;
  ingredients: (
    | {
    id: string;
    craftLevel?: string;
    quantity: number;
  }
    | {
    type:
      | "ascensionPrimary"
      | "ascensionElementalStone"
      | "ascensionLocal"
      | "secondary"
      | "ascensionCommon"
      | "talentPrimary"
      | "talentBoss";
    craftLevel?: string;
    quantity: number;
    exceptions?: {
      [k: string]: string | boolean;
    };
  }
  )[];
}
