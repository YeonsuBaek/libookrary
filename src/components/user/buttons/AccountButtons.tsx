'use client'
import { signOutApi, unsubscribeApi } from '@/apis/user'
import onToast from '@/components/common/Toast'
import { useUserStore } from '@/stores/user'
import { Button } from '@yeonsubaek/yeonsui'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

function AccountButtons() {
  const router = useRouter()
  const { t } = useTranslation()
  const { unsubscribe } = useUserStore()

  const onSignOut = () => {
    signOutApi({
      onSuccess: () => {
        localStorage.removeItem('userToken')
        onToast({ message: t('toast.user.logout.success') })
        router.push('/')
      },
      onError: () => onToast({ message: t('toast.user.logout.error'), color: 'error' }),
    })
  }

  const onUnsubscribe = () => {
    unsubscribeApi({
      onSuccess: () => {
        localStorage.removeItem('userToken')
        unsubscribe()
        onToast({ message: t('toast.user.unsubscribe.success') })
        router.push('/')
      },
      onError: () => onToast({ message: t('toast.user.unsubscribe'), color: 'error' }),
    })
  }

  return (
    <div className="account-etc-buttons">
      <Button variant="link" color="text" onClick={onSignOut}>
        {t('user.button.logout')}
      </Button>
      <Button variant="link" color="error" onClick={onUnsubscribe}>
        {t('user.button.unsubscribe')}
      </Button>
    </div>
  )
}

export default AccountButtons
