export function isTouchDevice(): boolean {
  if (process.server) {
    return false
  }
  return "ontouchstart" in window || navigator.maxTouchPoints > 0
}

export const getInteractionTypeText = ($t: (key: string) => string): string => {
  return isTouchDevice() ? $t("interactionType.tap") : $t("interactionType.click")
}
