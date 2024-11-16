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
      <Modal isOpen={props.isOpen} onClose={close} hasBackdrop>
        <Modal.Header hasCloseButton={close}>
          {config.title && <Modal.Title state="success">{props.title}</Modal.Title>}
        </Modal.Header>
        {config.message && <Modal.Content>{children}</Modal.Content>}
        <Modal.Footer>
          <Modal.Button onClick={close}>{labelClose}</Modal.Button>
          {config.onSave && (
            <Modal.Button type="ok" onClick={save}>
              {labelSave}
            </Modal.Button>
          )}
        </Modal.Footer>
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
