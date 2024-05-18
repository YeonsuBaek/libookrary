'use client'
import { PasswordTextField, TextField } from '@yeonsubaek/yeonsui'
import UserForm from '../layout/UserForm'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/user'
import { signInApi } from '@/apis/user'
import onToast from '@/components/common/Toast'

function LoginForm() {
  const router = useRouter()
  const { t } = useTranslation('')
  const { setIsLoggedIn } = useUserStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleClickSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await signInApi(
      {
        email,
        password,
      },
      {
        onSuccess: (res) => {
          onToast({ message: t('toast.user.login.success') })
          localStorage.setItem('userToken', res.user.email || '')
          setIsLoggedIn(true)
          router.replace('/')
        },
        onError: () => {
          onToast({ message: t('toast.user.login.error'), color: 'error' })
        },
      }
    )
  }

  return (
    <UserForm buttonName={t('user.button.login')} onClick={handleClickSubmit}>
      <TextField
        placeholder={t('user.form.email')}
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <PasswordTextField
        placeholder={t('user.form.password')}
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />
    </UserForm>
  )
}

export default LoginForm
