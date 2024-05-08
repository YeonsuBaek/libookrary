'use client'
import { getUserInfo } from '@/apis/user'
import { Button } from '@yeonsubaek/yeonsui'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function AccountInfo() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')

  useEffect(function fetchUserInfo() {
    ;(async () => {
      const info = await getUserInfo()
      setEmail(info?.email || '')
      setNickname(info?.nickname || '')
    })()
  }, [])

  return (
    <>
      <dl className="account-list">
        <div className="account-item">
          <dt className="account-title">{t('user.form.email')}</dt>
          <dd className="account-detail">{email}</dd>
        </div>
        <div className="account-item">
          <dt className="account-title">{t('user.form.nickname')}</dt>
          <dd className="account-detail">{nickname}</dd>
        </div>
      </dl>
      <div className="account-button">
        <Button>{t('user.button.edit')}</Button>
      </div>
    </>
  )
}

export default AccountInfo
