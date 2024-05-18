'use client'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UserForm from '../layout/UserForm'
import { PasswordTextField, TextField } from '@yeonsubaek/yeonsui'
import { useUserStore } from '@/stores/user'
import { editUserInfoApi } from '@/apis/user'
import onToast from '@/components/common/Toast'

function AccountEditForm() {
  const { t } = useTranslation('')
  const router = useRouter()
  const { email: emailStore, nickname: nicknameStore } = useUserStore()
  const [email, setEmail] = useState(emailStore)
  const [nickname, setNickname] = useState(nicknameStore)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const checkPassword = () => {
    return password.trim() === confirmPassword.trim()
  }

  const handleClickSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isCheckedPassword = checkPassword()

    if (isCheckedPassword) {
      await editUserInfoApi(
        { email, nickname },
        {
          onSuccess: () => {
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

  return (
    <UserForm buttonName={t('user.button.edit')} onClick={handleClickSubmit}>
      <TextField
        label={t('user.form.email')}
        size="large"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        required
      />
      <TextField
        label={t('user.form.nickname')}
        size="large"
        value={nickname}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
        required
      />
      <PasswordTextField
        label={t('user.form.password')}
        size="large"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        placeholder={t('user.form.password')}
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
