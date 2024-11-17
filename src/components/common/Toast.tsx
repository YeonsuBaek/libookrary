import { callDestroy } from '@/utils/afterClose'
import { Toast } from '@yeonsubaek/yeonsui'
import { createRoot } from 'react-dom/client'

interface ToastProps {
  id: string
  message: string
  duration?: number
  state?: 'success' | 'information' | 'warning' | 'error'
  hasIcon?: boolean
  hasCloseButton?: boolean
}

interface ToastComponentProps extends ToastProps {
  isOpen: boolean
}

function onToast({ ...config }: ToastProps) {
  const div = document.createElement('div')
  const root = createRoot(div)

  const afterClose = () => {
    callDestroy(root, close)
  }

  const close = () => {
    render({
      ...config,
      isOpen: false,
    })
    afterClose()
  }

  const render = (props: ToastComponentProps) => {
    root.render(
      <Toast {...props} onClose={close}>
        {props.message}
      </Toast>
    )
  }

  render({
    ...config,
    isOpen: true,
  })

  return { close }
}

export default onToast
