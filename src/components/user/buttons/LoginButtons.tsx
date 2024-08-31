'use client'
import { Button } from '@yeonsubaek/yeonsui'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

function LoginButtons() {
  const router = useRouter()
  const { t } = useTranslation('')

  return (
    <div className="login-etc-buttons">
      <Button styleType="ghost" styleVariant="primary" size="small">
        {t('user.button.findPassword')}
      </Button>
      <Button styleType="ghost" styleVariant="primary" size="small" onClick={() => router.push('/join')}>
        {t('user.button.joinUs')}
      </Button>
    </div>
  )
}

export default LoginButtons
