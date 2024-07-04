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
  if (palette?.LightVibrant) {
    const hex = rgbToHex(palette.LightVibrant.getRgb())
    return hex
  }
  return '#f0f0f0'
}

export const getFontColor = (hex: string) => {
  const rgb = hexToRGB(hex)
  const svg = rgb.reduce((x, y) => x + y) / 3
  return svg > 127 ? '#141414' : '#ffffff'
}
