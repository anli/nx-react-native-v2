/* istanbul ignore file */
const componentFromStr = (numStr: string, percent?: string): number => {
  const num = Math.max(0, parseInt(numStr, 10))
  return percent != null
    ? Math.floor((255 * Math.min(100, num)) / 100)
    : Math.min(255, num)
}

export const rgbToHex = (rgb: string): string => {
  const rgbRegex =
    /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/
  let result
  let r
  let g
  let b
  let hex = ''

  if ((result = rgbRegex.exec(rgb)) != null) {
    r = componentFromStr(result[1], result[2])
    g = componentFromStr(result[3], result[4])
    b = componentFromStr(result[5], result[6])

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    hex = '0x' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }
  return `#${hex.slice(2)}`
}
