import { Root } from 'react-dom/client'

export const destroyFns: Array<() => void> = []
export const destroyAllModals = () => {
  while (destroyFns.length) {
    const close = destroyFns.pop()
    if (close) {
      close()
    }
  }
}

export const callDestroy = (root: Root, close: () => void): void => {
  root?.unmount()

  for (let i = 0; i < destroyFns.length; i += 1) {
    const fn = destroyFns[i]
    if (fn === close) {
      destroyFns.splice(i, 1)
      break
    }
  }
}
