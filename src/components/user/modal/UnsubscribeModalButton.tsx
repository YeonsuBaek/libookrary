'use client'
import { reauthenticateUserApi, unsubscribeApi } from '@/apis/user'
import onToast from '@/components/common/Toast'
import { useUserStore } from '@/stores/user'
import { Button, Modal, TextField } from '@yeonsubaek/yeonsui'
import { useRouter } from 'next/navigation'
import React, { KeyboardEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

function UnsubscribeModalButton() {
  const router = useRouter()
  const { t } = useTranslation()
  const { unsubscribe } = useUserStore()
  const [isOpen, setIsOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [isErrorPassword, setIsErrorPassword] = useState(false)

  const checkPassword = () => {
    reauthenticateUserApi(password, {
      onSuccess: onUnsubscribe,
      onError: () => {
        setIsErrorPassword(true)
      },
    })
  }

  const onUnsubscribe = () => {
    unsubscribeApi({
      onSuccess: () => {
        unsubscribe()
        onToast({ id: 'unsubscribe-success-toast', message: t('toast.user.unsubscribe.success'), state: 'success' })
        router.push('/')
      },
      onError: () => onToast({ id: 'unsubscribe-error-toast', message: t('toast.user.unsubscribe'), state: 'error' }),
    })
  }

  const onEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkPassword()
    }
  }

  return (
    <>
      <Button styleType="ghost" styleVariant="primary" onClick={() => setIsOpen(true)} color="danger">
        {t('user.button.unsubscribe')}
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} hasBackdrop>
        <Modal.Header>
          <Modal.Title state="warning">{t('modal.user.unsubscribe')}</Modal.Title>
        </Modal.Header>
        <Modal.Content>
          <p>{t('modal.user.checkPassword')}</p>
          <TextField
            id="password"
            type="password"
            placeholder={t('user.form.password')}
            value={password}
            onChange={(val) => {
              setPassword(val)
              setIsErrorPassword(false)
            }}
            isError={isErrorPassword}
            errorText={t('helperText.unsubscribe.confirmPassword')}
            onKeyDown={onEnter}
          />
        </Modal.Content>
        <Modal.Footer>
          <Modal.Button type="cancel" onClick={() => setIsOpen(false)}>
            {t('common.button.cancel')}
          </Modal.Button>
          <Button styleType="filled" onClick={checkPassword} disabled={!password}>
            {t('user.button.unsubscribe')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UnsubscribeModalButton
