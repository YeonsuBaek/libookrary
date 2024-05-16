import Vibrant from 'node-vibrant'

export const getBookColor = async (cover: string) => {
  const palette = await Vibrant.from(cover).getPalette()
  if (palette?.Vibrant) {
    const rgb = `rgb(${palette.Vibrant.getRgb().join(', ')})`
    return rgb
  }
  return '#f0f0f0'
}
