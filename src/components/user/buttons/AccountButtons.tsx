'use client'
import { signOutApi, unsubscribeApi } from '@/apis/user'
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
        alert('로그아웃하였습니다.')
        router.push('/')
      },
      onError: (error) => {
        console.error(error)
      },
    })
  }

  const onUnsubscribe = () => {
    unsubscribeApi({
      onSuccess: () => {
        localStorage.removeItem('userToken')
        unsubscribe()
        alert('성공적으로 탈퇴하였습니다.')
        router.push('/')
      },
      onError: console.error,
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
