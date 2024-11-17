'use client'
import { TextField } from '@yeonsubaek/yeonsui'
import UserForm from '../layout/UserForm'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
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
  const [isSending, setIsSending] = useState(false)

  const onSubmit = () => {
    setIsSending(true)
    signInApi(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          onToast({ id: 'submit-success-toast', message: t('toast.user.login.success'), state: 'success' })
          setIsLoggedIn(true)
          router.replace('/')
          setIsSending(false)
        },
        onError: () => {
          onToast({ id: 'submit-error-toast', message: t('toast.user.login.error'), state: 'error' })
          setIsSending(false)
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

  const onEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheckValid()
    }
  }

  return (
    <UserForm buttonName={t('user.button.login')} onClick={handleCheckValid} isSending={isSending}>
      <TextField
        id="user-login-form-email"
        placeholder={t('user.form.email')}
        value={email}
        onChange={setEmail}
        isError={invalids.includes('email')}
        helperText={invalids.includes('email') ? t('helperText.login.email') : ''}
      />
      <TextField
        id="user-login-form-password"
        type="password"
        placeholder={t('user.form.password')}
        value={password}
        onChange={setPassword}
        isError={invalids.includes('password')}
        helperText={invalids.includes('password') ? t('helperText.login.password') : ''}
        onKeyDown={onEnter}
      />
    </UserForm>
  )
}

export default LoginForm
