import { callDestroy } from '@/utils/afterClose'
import { createRoot } from 'react-dom/client'
import i18n from '@/locales/i18n'
import { Modal } from '@yeonsubaek/yeonsui'

interface ModalProps {
  message: string
  title?: string
  icon?: 'info' | 'warning' | 'success' | 'error' | 'question'
  labelSave?: string
  labelClose?: string
  onSave?: () => void
  onClose?: () => void
}

interface ModalComponentProps extends ModalProps {
  isOpen: boolean
}

function onModal({ ...config }: ModalProps) {
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
    if (config.onClose) config.onClose()
    afterClose()
  }

  const save = () => {
    if (config.onSave) config.onSave()
    close()
  }

  const render = (props: ModalComponentProps) => {
    const labelClose = props?.labelClose || i18n.t('common.button.cancel')
    const labelSave = props?.labelSave || i18n.t('common.button.ok')
    const children = <>{props.message}</>

    root.render(
      <Modal {...props} labelClose={labelClose} labelSave={labelSave} onClose={close} onSave={save}>
        {children}
      </Modal>
    )
  }

  render({
    ...config,
    isOpen: true,
  })

  return { close }
}

export default onModal
