'use client'
import { signOutApi } from '@/apis/user'
import onModal from '@/components/common/Modal'
import onToast from '@/components/common/Toast'
import { useUserStore } from '@/stores/user'
import { Button } from '@yeonsubaek/yeonsui'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import UnsubscribeModalButton from '../modal/UnsubscribeModalButton'

function AccountButtons() {
  const router = useRouter()
  const { t } = useTranslation()
  const { setIsLoggedIn } = useUserStore()

  const handleOpenSignOut = () => {
    onModal({
      message: t('modal.user.logout'),
      onSave: onSignOut,
    })
  }

  const onSignOut = () => {
    signOutApi({
      onSuccess: () => {
        setIsLoggedIn(false)
        onToast({ id: 'sign-out-success-toast', message: t('toast.user.logout.success'), state: 'success' })
        router.push('/')
      },
      onError: () => onToast({ id: 'sign-out-error-toast', message: t('toast.user.logout.error'), state: 'error' }),
    })
  }

  return (
    <div className="account-etc-buttons">
      <Button styleType="ghost" styleVariant="primary" onClick={handleOpenSignOut}>
        {t('user.button.logout')}
      </Button>
      <UnsubscribeModalButton />
    </div>
  )
}

export default AccountButtons
