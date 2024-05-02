'use client'
import { useTranslation } from 'react-i18next'
import { Button, TextField } from '@yeonsubaek/yeonsui'

function page() {
  const { t } = useTranslation('')

  return (
    <div className="login">
      <h2 className="login-title">{t('user.login')}</h2>
      <div className="login-form">
        <div className="login-input">
          <TextField placeholder={t('user.form.email')} />
          <TextField placeholder={t('user.form.password')} />
        </div>
        <Button>{t('user.button.login')}</Button>
      </div>
      <div className="login-etc-buttons">
        <Button variant="link">{t('user.button.findPassword')}</Button>
        <Button variant="link">{t('user.button.joinUs')}</Button>
      </div>
    </div>
  )
}

export default page
