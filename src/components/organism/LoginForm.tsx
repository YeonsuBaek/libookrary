'use client'
import { PasswordTextField, TextField } from '@yeonsubaek/yeonsui'
import UserForm from '../molecule/UserForm'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSignIn } from '@/hooks/useUser'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/user'

function LoginForm() {
  const router = useRouter()
  const { t } = useTranslation('')
  const { mutate } = useSignIn()
  const { setIsLoggedIn } = useUserStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (res) => {
          alert('로그인에 성공하였습니다.')
          localStorage.setItem('userToken', res.user.email || '')
          setIsLoggedIn(true)
          router.replace('/')
        },
        onError: (error) => {
          console.error(error)
        },
      }
    )
  }

  return (
    <UserForm buttonName={t('user.button.login')} onSubmit={onSubmit}>
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
