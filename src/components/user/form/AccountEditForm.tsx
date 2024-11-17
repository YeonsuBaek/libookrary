'use client'
import { useRouter } from 'next/navigation'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UserForm from '../layout/UserForm'
import { RadioGroup, TextField } from '@yeonsubaek/yeonsui'
import { useUserStore } from '@/stores/user'
import { editUserInfoApi } from '@/apis/user'
import onToast from '@/components/common/Toast'
import { InvalidsType, LANGUAGE_VALUES, LanguageType } from '@/types/user'
import i18n from '@/locales/i18n'
import { auth } from '../../../../firebase.config'
import { reauthenticateWithCredential } from 'firebase/auth'
import { EmailAuthProvider } from 'firebase/auth/cordova'

function AccountEditForm() {
  const { t } = useTranslation('')
  const router = useRouter()
  const { email: emailStore, nickname: nicknameStore } = useUserStore()
  const [email, setEmail] = useState(emailStore)
  const [nickname, setNickname] = useState(nicknameStore)
  const [language, setLanguage] = useState<LanguageType>(i18n.language as LanguageType)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [invalids, setInvalids] = useState<InvalidsType[]>([])
  const [isSending, setIsSending] = useState(false)

  const onSubmit = async () => {
    setIsSending(true)
    const user = auth.currentUser

    if (user && user.email) {
      const credential = EmailAuthProvider.credential(user.email, confirmPassword)
      try {
        await reauthenticateWithCredential(user, credential)
        await editUserInfoApi(
          { email, nickname, language },
          {
            onSuccess: () => {
              onToast({ id: 'edit-success-toast', message: t('toast.user.account.success'), state: 'success' })
              router.push('/')
            },
            onError: () => onToast({ id: 'edit-error-toast', message: t('toast.user.account.error'), state: 'error' }),
          }
        )
      } catch (error) {
        onToast({ id: 'password-error-toast', message: t('toast.user.account.password'), state: 'warning' })
      } finally {
        setIsSending(false)
      }
    } else {
      onToast({ id: 'email-error-toast', message: t('toast.user.account.email'), state: 'error' })
      setIsSending(false)
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
    setInvalids(formInvalids)

    if (formInvalids.length === 0) {
      onSubmit()
    }
  }

  const onEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheckValid()
    }
  }

  return (
    <UserForm buttonName={t('user.button.edit')} onClick={handleCheckValid} isSending={isSending}>
      <TextField
        id="user-account-edit-email"
        label={t('user.form.email')}
        size="large"
        value={email}
        onChange={setEmail}
        isError={invalids.includes('email')}
        helperText={invalids.includes('email') ? t('helperText.join.email') : ''}
        required
      />
      <TextField
        id="user-account-edit-nickname"
        label={t('user.form.nickname')}
        size="large"
        value={nickname}
        onChange={setNickname}
        isError={invalids.includes('nickname')}
        helperText={invalids.includes('nickname') ? t('helperText.join.nickname') : ''}
        required
      />
      <TextField
        id="user-account-edit-confirm-password"
        label={t('user.form.confirmPassword')}
        size="large"
        value={confirmPassword}
        onChange={setConfirmPassword}
        type="password"
        placeholder={t('user.form.confirmPassword')}
        required
        onKeyDown={onEnter}
      />
    </UserForm>
  )
}

export default AccountEditForm
