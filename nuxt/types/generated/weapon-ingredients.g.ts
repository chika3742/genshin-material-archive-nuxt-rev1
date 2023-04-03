/* This file was generated. DO NOT edit by hand. */

export type WeaponIngredients = LevelIngredients[];

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
