/* This file was generated. DO NOT edit by hand. */

export type FurnitureList = Furniture[];

export interface Furniture {
  /**
   * 調度品のID
   */
  id: string;
  /**
   * 調度品の種類
   */
  type?: "ornament";
  /**
   * 調度品の日本語名
   */
  nameJP: string;
  /**
   * 調度品の日本語名の読み。すべてカタカナの場合は不要。
   */
  yomi?: string;
  /**
   * 調度品の入手方法のi18nキー
   */
  whereToGet?: string;
}
