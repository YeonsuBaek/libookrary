import Vibrant from 'node-vibrant'

const rgbToHex = (rgb: [number, number, number]) => {
  const convertChannel = (x: number) => Math.round(x).toString(16).padStart(2, '0')
  return `#${rgb.map(convertChannel).reduce((x, y) => x + y)}`
}

const hexToRGB = (hexString: string) => {
  const parseHex = (x: string) => parseInt(x, 16)
  return [parseHex(hexString.slice(1, 3)), parseHex(hexString.slice(3, 5)), parseHex(hexString.slice(5, 7))]
}

export const getBookColor = async (cover: string) => {
  const palette = await Vibrant.from(cover).getPalette()
  const colorList = []
  if (palette?.LightVibrant) {
    const hex = rgbToHex(palette.LightVibrant.getRgb())
    colorList.push(hex)
  }
  if (palette?.Vibrant) {
    const hex = rgbToHex(palette.Vibrant.getRgb())
    colorList.push(hex)
  }
  if (palette?.DarkVibrant) {
    const hex = rgbToHex(palette.DarkVibrant.getRgb())
    colorList.push(hex)
  }
  if (palette?.LightMuted) {
    const hex = rgbToHex(palette.LightMuted.getRgb())
    colorList.push(hex)
  }
  if (palette?.Muted) {
    const hex = rgbToHex(palette.Muted.getRgb())
    colorList.push(hex)
  }
  if (palette?.DarkMuted) {
    const hex = rgbToHex(palette.DarkMuted.getRgb())
    colorList.push(hex)
  }

  return colorList
}

export const getFontColor = (hex: string) => {
  const rgb = hexToRGB(hex)
  const svg = rgb.reduce((x, y) => x + y) / 3
  return svg > 127 ? '#141414' : '#ffffff'
}
