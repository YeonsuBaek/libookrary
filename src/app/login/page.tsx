'use client'
import { useTranslation } from 'react-i18next'
import { Button, TextField } from '@yeonsubaek/yeonsui'
import UserForm from '@/components/molecule/UserForm'
import { useRouter } from 'next/navigation'
import PageTitle from '@/components/atom/PageTitle'

function page() {
  const router = useRouter()
  const { t } = useTranslation('')

  return (
    <div className="login">
      <PageTitle>{t('user.login')}</PageTitle>
      <UserForm buttonName={t('user.button.login')}>
        <TextField placeholder={t('user.form.email')} />
        <TextField placeholder={t('user.form.password')} />
      </UserForm>
      <div className="login-etc-buttons">
        <Button variant="link">{t('user.button.findPassword')}</Button>
        <Button variant="link" onClick={() => router.push('/join')}>
          {t('user.button.joinUs')}
        </Button>
      </div>
    </div>
  )
}

export default page
