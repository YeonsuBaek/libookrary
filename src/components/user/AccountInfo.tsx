'use client'
import { getUserInfoApi } from '@/apis/user'
import i18n from '@/locales/i18n'
import { useUserStore } from '@/stores/user'
import { Button } from '@yeonsubaek/yeonsui'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function AccountInfo() {
  const { t } = useTranslation()
  const router = useRouter()
  const { setEmail: setEmailStore, setNickname: setNicknameStore } = useUserStore()
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')

  useEffect(function fetchUserInfo() {
    ;(async () => {
      const info = await getUserInfoApi()
      setEmail(info?.email || '')
      setNickname(info?.nickname || '')
      setEmailStore(info?.email || '')
      setNicknameStore(info?.nickname || '')
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
        <div className="account-item">
          <dt className="account-title">{t('user.form.language')}</dt>
          <dd className="account-detail">
            {i18n.language === 'en' ? t('common.language.en-en') : t('common.language.ko-ko')}
          </dd>
        </div>
      </dl>
      <div className="account-button">
        <Button styleType="filled" styleVariant="primary" onClick={() => router.push('/account/edit')}>
          {t('user.button.edit')}
        </Button>
      </div>
    </>
  )
}

export default AccountInfo
