'use client'
import { useSignOut } from '@/hooks/useUser'
import { useUserStore } from '@/stores/user'
import { Button } from '@yeonsubaek/yeonsui'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

function AccountButtons() {
  const router = useRouter()
  const { t } = useTranslation()
  const { setIsLoggedIn } = useUserStore()
  const { mutate } = useSignOut()

  const onSignOut = () => {
    mutate(null, {
      onSuccess: () => {
        localStorage.removeItem('userToken')
        alert('로그아웃하였습니다.')
        setIsLoggedIn(false)
        router.push('/')
      },
      onError: (error: any) => {
        console.error(error)
      },
    })
  }

  return (
    <div className="account-etc-buttons">
      <Button variant="link" color="text" onClick={onSignOut}>
        {t('user.button.logout')}
      </Button>
      <Button variant="link" color="error">
        {t('user.button.unsubscribe')}
      </Button>
    </div>
  )
}

export default AccountButtons
