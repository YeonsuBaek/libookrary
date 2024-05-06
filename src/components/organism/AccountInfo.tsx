'use client'
import { Button } from '@yeonsubaek/yeonsui'
import { useTranslation } from 'react-i18next'

function AccountInfo() {
  const { t } = useTranslation()

  return (
    <>
      <dl className="account-list">
        <div className="account-item">
          <dt className="account-title">이메일</dt>
          <dd className="account-detail">1234@gmail.com</dd>
        </div>
        <div className="account-item">
          <dt className="account-title">닉네임</dt>
          <dd className="account-detail">이름</dd>
        </div>
      </dl>
      <div className="account-button">
        <Button>{t('user.button.edit')}</Button>
      </div>
    </>
  )
}

export default AccountInfo
