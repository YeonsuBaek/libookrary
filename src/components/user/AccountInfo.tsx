'use client'
import { getUserInfoApi } from '@/apis/user'
import i18n from '@/locales/i18n'
import { useUserStore } from '@/stores/user'
import { LANGUAGE_VALUES } from '@/types/user'
import { Button, RadioGroup } from '@yeonsubaek/yeonsui'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function AccountInfo() {
  const { t } = useTranslation()
  const LANGUAGE_LIST = [
    { value: LANGUAGE_VALUES.ko, label: t('common.language.ko-ko'), id: 'language1' },
    { value: LANGUAGE_VALUES.en, label: t('common.language.en-en'), id: 'language2' },
  ]
  const router = useRouter()
  const { setEmail: setEmailStore, setNickname: setNicknameStore } = useUserStore()
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [lang, setLang] = useState('ko')

  const onChangeLanguage = (lang: LANGUAGE_VALUES) => {
    localStorage.setItem('lang', lang)
    i18n.changeLanguage(lang)
    setLang(lang)
  }

  useEffect(function fetchUserInfo() {
    ;(async () => {
      const info = await getUserInfoApi()
      setEmail(info?.email || '')
      setNickname(info?.nickname || '')
      setEmailStore(info?.email || '')
      setNicknameStore(info?.nickname || '')
    })()
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLang(localStorage.getItem('lang') || 'ko')
    }
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
      <RadioGroup
        label={t('user.form.language')}
        name="user-account-edit-language"
        options={LANGUAGE_LIST}
        checkedOption={lang}
        onChange={(lang) => onChangeLanguage(lang as LANGUAGE_VALUES)}
      />
      <div className="account-button">
        <Button styleType="filled" styleVariant="primary" onClick={() => router.push('/account/edit')}>
          {t('user.button.edit')}
        </Button>
      </div>
    </>
  )
}

export default AccountInfo
