'use client'
import { TextField } from '@yeonsubaek/yeonsui'
import UserForm from '../layout/UserForm'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/user'
import { signInApi } from '@/apis/user'
import onToast from '@/components/common/Toast'

type InvalidsType = 'email' | 'password'

function LoginForm() {
  const router = useRouter()
  const { t } = useTranslation('')
  const { setIsLoggedIn } = useUserStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [invalids, setInvalids] = useState<InvalidsType[]>([])

  const onSubmit = () => {
    signInApi(
      {
        email,
        password,
      },
      {
        onSuccess: (res) => {
          onToast({ id: 'submit-success-toast', message: t('toast.user.login.success') })
          setIsLoggedIn(true)
          router.replace('/')
        },
        onError: () => {
          onToast({ id: 'submit-error-toast', message: t('toast.user.login.error'), color: 'error' })
        },
      }
    )
  }

  const handleCheckValid = () => {
    const formInvalids: InvalidsType[] = []
    if (email.trim() === '') {
      formInvalids.push('email')
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
    <UserForm buttonName={t('user.button.login')} onClick={handleCheckValid}>
      <TextField
        id="user-login-form-email"
        placeholder={t('user.form.email')}
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        isError={invalids.includes('email')}
        helperText={invalids.includes('email') ? t('helperText.login.email') : ''}
      />
      <TextField.Password
        id="user-login-form-password"
        placeholder={t('user.form.password')}
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        isError={invalids.includes('password')}
        helperText={invalids.includes('password') ? t('helperText.login.password') : ''}
      />
    </UserForm>
  )
}

export default LoginForm
