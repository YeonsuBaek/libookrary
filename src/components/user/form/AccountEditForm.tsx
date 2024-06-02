'use client'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UserForm from '../layout/UserForm'
import { PasswordTextField, TextField } from '@yeonsubaek/yeonsui'
import { useUserStore } from '@/stores/user'
import { editUserInfoApi } from '@/apis/user'
import onToast from '@/components/common/Toast'
import { InvalidsType, LanguageType } from '@/types/user'
import i18n from '@/locales/i18n'

function AccountEditForm() {
  const { t } = useTranslation('')
  const router = useRouter()
  const { email: emailStore, nickname: nicknameStore } = useUserStore()
  const [email, setEmail] = useState(emailStore)
  const [nickname, setNickname] = useState(nicknameStore)
  const [language, setLanguage] = useState<LanguageType>(i18n.language as LanguageType)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [invalids, setInvalids] = useState<InvalidsType[]>([])

  const checkPassword = () => {
    return password.trim() === confirmPassword.trim()
  }

  const onSubmit = async () => {
    const isCheckedPassword = checkPassword()

    if (isCheckedPassword) {
      await editUserInfoApi(
        { email, nickname, language },
        {
          onSuccess: () => {
            i18n.changeLanguage(language)
            onToast({ message: t('toast.user.account.success') })
            router.push('/')
          },
          onError: () => onToast({ message: t('toast.user.account.error'), color: 'error' }),
        }
      )
    } else {
      onToast({ message: t('toast.user.account.password'), color: 'warning' })
    }
  }

  const handleCheckValid = () => {
    const formInvalids: InvalidsType[] = []
    if (email.trim() === '') {
      formInvalids.push('email')
    }
    if (nickname.trim() === '') {
      formInvalids.push('nickname')
    }
    if (password.trim() === '') {
      formInvalids.push('password')
    }
    setInvalids(formInvalids)

    if (formInvalids.length === 0) {
      onSubmit()
    }
  }

  return (
    <UserForm buttonName={t('user.button.edit')} onClick={handleCheckValid}>
      <TextField
        label={t('user.form.email')}
        size="large"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        isError={invalids.includes('email')}
        helperText={invalids.includes('email') ? t('helperText.join.email') : ''}
        required
      />
      <TextField
        label={t('user.form.nickname')}
        size="large"
        value={nickname}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
        isError={invalids.includes('nickname')}
        helperText={invalids.includes('nickname') ? t('helperText.join.nickname') : ''}
        required
      />
      <form>
        <label>
          <input type="radio" value="en" checked={language === 'en'} onChange={() => setLanguage('en')} />
          English
        </label>
        <label>
          <input type="radio" value="ko" checked={language === 'ko'} onChange={() => setLanguage('ko')} />
          한국어
        </label>
      </form>
      <PasswordTextField
        label={t('user.form.password')}
        size="large"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        placeholder={t('user.form.password')}
        isError={invalids.includes('password')}
        helperText={invalids.includes('password') ? t('helperText.join.password') : ''}
        required
      />
      <PasswordTextField
        label={t('user.form.confirmPassword')}
        size="large"
        value={confirmPassword}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
        placeholder={t('user.form.confirmPassword')}
        required
      />
    </UserForm>
  )
}

export default AccountEditForm
