'use client'
import { signOutApi, unsubscribeApi } from '@/apis/user'
import onModal from '@/components/common/Modal'
import onToast from '@/components/common/Toast'
import { useUserStore } from '@/stores/user'
import { Button } from '@yeonsubaek/yeonsui'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

function AccountButtons() {
  const router = useRouter()
  const { t } = useTranslation()
  const { unsubscribe } = useUserStore()

  const handleOpenSignOut = () => {
    onModal({
      message: t('modal.user.logout'),
      onSave: onSignOut,
    })
  }

  const onSignOut = () => {
    signOutApi({
      onSuccess: () => {
        typeof window !== 'undefined' && localStorage.removeItem('userToken')
        onToast({ id: 'sign-out-success-toast', message: t('toast.user.logout.success') })
        router.push('/')
      },
      onError: () => onToast({ id: 'sign-out-error-toast', message: t('toast.user.logout.error'), color: 'error' }),
    })
  }

  const handleOpenUnsubscribeModal = () => {
    onModal({
      message: t('modal.user.unsubscribe'),
      onSave: onUnsubscribe,
    })
  }

  const onUnsubscribe = () => {
    unsubscribeApi({
      onSuccess: () => {
        typeof window !== 'undefined' && localStorage.removeItem('userToken')
        unsubscribe()
        onToast({ id: 'unsubscribe-success-toast', message: t('toast.user.unsubscribe.success') })
        router.push('/')
      },
      onError: () => onToast({ id: 'unsubscribe-error-toast', message: t('toast.user.unsubscribe'), color: 'error' }),
    })
  }

  return (
    <div className="account-etc-buttons">
      <Button variant="text" onClick={handleOpenSignOut}>
        {t('user.button.logout')}
      </Button>
      <Button variant="link" color="error" onClick={handleOpenUnsubscribeModal}>
        {t('user.button.unsubscribe')}
      </Button>
    </div>
  )
}

export default AccountButtons
