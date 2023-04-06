/* This file was generated. DO NOT edit by hand. */

export type Weapons = Weapon[];

export interface Weapon {
  /**
   * 武器のID
   */
  id: string;
  /**
   * 武器の日本語名
   */
  nameJP: string;
  /**
   * 武器の日本語名の読み。すべてカタカナの場合は不要。
   */
  yomi?: string;
  /**
   * 武器のレアリティ
   */
  rarity: number;
  /**
   * 武器の種類
   */
  type: "sword" | "claymore" | "polearm" | "catalyst" | "bow";
  /**
   * 武器のサブステータス
   */
  subStat?: "atkPercent" | "hpPercent" | "defPercent" | "recharge" | "critRate" | "critDmg" | "em" | "physicalDmgBonus";
  /**
   * 武器の説明文があるかどうか
   */
  hasDescription?: boolean;
  /**
   * 武器の入手方法のi18nキー
   */
  whereToGet:
    | string
    | (
    | "treasureChestsOrQuests"
    | "gacha"
    | "treasureChests"
    | "starglitterExchange"
    | "forging"
    | "limitedGacha"
    | "battlePass"
    | "eventUnavailable"
    | "event"
    );
  materials: WeaponMaterials;
}
/**
 * 武器の強化素材
 */
export interface WeaponMaterials {
  /**
   * 武器突破用のプライマリ素材 (例: 高塔の王の瓦)
   */
  ascensionPrimary: string;
  /**
   * 武器突破用のセカンダリ素材 (例: 地脈の旧枝)
   */
  secondary: string;
  /**
   * 武器強化用の共通素材 (例: 牢固な矢先)
   */
  ascensionCommon: string;
}
