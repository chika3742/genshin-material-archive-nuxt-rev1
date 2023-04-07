/* This file was generated. DO NOT edit by hand. */

export type Materials = Material[];

export interface Material {
  /**
   * 素材のID
   */
  id: string;
  /**
   * 素材の日本語名
   */
  nameJP: string;
  /**
   * 素材の日本語名の読み。すべてカタカナの場合は不要。
   */
  yomi?: string;
  /**
   * 素材の種類
   */
  type: "exp" | "common" | "fieldBoss" | "elemental" | "talent" | "weeklyBoss" | "weapon" | "wood" | "local" | "others";
  /**
   * 素材の入手方法。string型の場合はi18nキー。
   */
  whereToGet?:
    | {
        /**
         * テイワットマップにおける素材ID
         */
        teyvatMap?: string;
      }
    | string;
  /**
   * 素材の入手可能曜日
   */
  dayAvailable?: (0 | 1 | 2 | 3 | 4 | 5 | 6)[];
}
