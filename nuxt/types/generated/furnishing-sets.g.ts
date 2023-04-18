/* This file was generated. DO NOT edit by hand. */

export type FurnishingSets = FurnishingSet[];

export interface FurnishingSet {
  /**
   * 調度品セットのID
   */
  id: string;
  /**
   * 調度品セットの日本語名
   */
  nameJP: string;
  /**
   * 調度品セットの日本語名の読み。すべてカタカナの場合は不要。
   */
  yomi?: string;
  /**
   * 調度品セットの種類
   */
  type: "indoorSet" | "indoorGiftSet" | "outdoorSet" | "outdoorGiftSet";
  /**
   * 調度品セットの要素となる調度品
   */
  consistsOf: {
    /**
     * 調度品のID
     */
    id: string;
    /**
     * 調度品の個数
     */
    quantity: number;
  }[];
  /**
   * この調度品セットを好むキャラクター
   */
  favoredBy?: string[];
  /**
   * 調度品セットの設計図の入手方法のi18nキー
   */
  whereToGetBlueprint?: string;
}
