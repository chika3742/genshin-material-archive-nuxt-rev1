export function isTouchDevice(): boolean {
  if (process.server) {
    return false
  }
  return "ontouchstart" in window || navigator.maxTouchPoints > 0
}
