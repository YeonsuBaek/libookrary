'use client'
import PageTitle from '@/components/atom/PageTitle'
import UserForm from '@/components/molecule/UserForm'
import { TextField } from '@yeonsubaek/yeonsui'
import { useTranslation } from 'react-i18next'

function page() {
  const { t } = useTranslation('')

  return (
    <div className="join">
      <PageTitle>{t('user.join')}</PageTitle>
      <UserForm buttonName={t('user.button.join')}>
        <TextField label={t('user.form.email')} size="large" required />
        <TextField label={t('user.form.nickname')} size="large" required />
        <TextField label={t('user.form.password')} size="large" required />
        <TextField label={t('user.form.confirmPassword')} size="large" required />
        <TextField label={t('user.form.hintPassword')} size="large" required />
      </UserForm>
    </div>
  )
}

export default page
