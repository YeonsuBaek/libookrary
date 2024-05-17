import Vibrant from 'node-vibrant'

const rgbToHex = (rgb: [number, number, number]) => {
  const convertChannel = (x: number) => Math.round(x).toString(16).padStart(2, '0')
  return `#${rgb.map(convertChannel).reduce((x, y) => x + y)}`
}

export const getBookColor = async (cover: string) => {
  const palette = await Vibrant.from(cover).getPalette()
  if (palette?.LightVibrant) {
    const hex = rgbToHex(palette.LightVibrant.getRgb())
    return hex
  }
  return '#f0f0f0'
}
