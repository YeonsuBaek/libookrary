'use client'
import { Button } from '@yeonsubaek/yeonsui'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

function LoginButtons() {
  const router = useRouter()
  const { t } = useTranslation('')

  return (
    <div className="login-etc-buttons">
      <Button variant="link">{t('user.button.findPassword')}</Button>
      <Button variant="link" onClick={() => router.push('/join')}>
        {t('user.button.joinUs')}
      </Button>
    </div>
  )
}

export default LoginButtons
