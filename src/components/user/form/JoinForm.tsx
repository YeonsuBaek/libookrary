'use client'
import { PasswordTextField, TextField } from '@yeonsubaek/yeonsui'
import UserForm from '../layout/UserForm'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { signUpApi } from '@/apis/user'
import onToast from '@/components/common/Toast'
import { InvalidsType } from '@/types/user'

function JoinForm() {
  const { t } = useTranslation('')
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [invalids, setInvalids] = useState<InvalidsType[]>([])

  const checkPassword = () => {
    return password.trim() === confirmPassword.trim()
  }

  const onSubmit = () => {
    const isCheckedPassword = checkPassword()

    if (isCheckedPassword) {
      signUpApi(
        { email, password, nickname },
        {
          onSuccess: () => {
            onToast({ message: t('toast.user.join.success') })
            router.push('/')
          },
          onError: () => onToast({ message: t('toast.user.join.error'), color: 'error' }),
        }
      )
    } else {
      onToast({ message: t('toast.user.join.password'), color: 'warning' })
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
    <UserForm buttonName={t('user.button.join')} onClick={handleCheckValid}>
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
      <PasswordTextField
        label={t('user.form.password')}
        size="large"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        isError={invalids.includes('password')}
        helperText={invalids.includes('password') ? t('helperText.join.password') : ''}
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

export default JoinForm
