'use client'
import { useTranslation } from 'react-i18next'
import { Button, PasswordTextField, TextField } from '@yeonsubaek/yeonsui'
import UserForm from '@/components/molecule/UserForm'
import { useRouter } from 'next/navigation'
import PageTitle from '@/components/atom/PageTitle'
import { ChangeEvent, useState } from 'react'
import { useSignIn } from '@/hooks/useUser'
import { useUserStore } from '@/stores/user'

function page() {
  const router = useRouter()
  const { setIsLoggedIn } = useUserStore()
  const { t } = useTranslation('')
  const { mutate } = useSignIn()
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
          localStorage.setItem('userToken', res.user.email)
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
    <div className="login">
      <PageTitle>{t('user.login')}</PageTitle>
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
      <div className="login-etc-buttons">
        <Button variant="link">{t('user.button.findPassword')}</Button>
        <Button variant="link" onClick={() => router.push('/join')}>
          {t('user.button.joinUs')}
        </Button>
      </div>
    </div>
  )
}

export default page
