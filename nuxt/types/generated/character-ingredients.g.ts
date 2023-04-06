/* This file was generated. DO NOT edit by hand. */

export type Ingredient =
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
    };

export interface CharacterIngredients {
  ascension: LevelIngredients[];
  normalAttack: LevelIngredients[];
  elementalSkill: LevelIngredients[];
  elementalBurst: LevelIngredients[];
}
export interface LevelIngredients {
  level: number;
  ingredients: Ingredient[];
}
