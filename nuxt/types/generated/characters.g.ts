/* This file was generated. DO NOT edit by hand. */

export type Characters = Character[];

export interface Character {
  /**
   * キャラクターのID
   */
  id: string;
  /**
   * キャラクターの日本語名
   */
  nameJP: string;
  /**
   * キャラクターの日本語名の読み。すべてカタカナの場合は不要。
   */
  yomi?: string;
  /**
   * キャラクターの元素
   */
  element: "anemo" | "cryo" | "dendro" | "electro" | "geo" | "hydro" | "pyro";
  /**
   * キャラクターのレアリティ
   */
  rarity: 4 | 5;
  /**
   * キャラクターの武器種
   */
  weaponType: "sword" | "claymore" | "polearm" | "catalyst" | "bow";
  materials: CharacterMaterials;
}
/**
 * キャラクターの強化素材
 */
export interface CharacterMaterials {
  /**
   * キャラ突破用のプライマリ素材 (例: 炎願のアゲート) のID。
   */
  ascensionPrimary: string;
  /**
   * キャラ突破用のフィールドボス素材 (例: 常燃の火種) のID。
   */
  ascensionElementalStone?: string;
  /**
   * キャラ突破用の地域特産素材 (例: 石珀) のID。
   */
  ascensionLocal: string;
  /**
   * キャラ突破/天賦用のセカンダリ素材 (例: スライムの液体) のID。
   */
  secondary: string;
  /**
   * キャラ天賦レベルアップ用のプライマリ素材 (例: 「自由」の教え) のID。
   */
  talentPrimary?: string;
  /**
   * キャラ天賦レベルアップ用の週ボス素材 (例: 東風の羽根) のID。
   */
  talentBoss?: string;
}
