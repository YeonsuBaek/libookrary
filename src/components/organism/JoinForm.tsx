'use client'
import { PasswordTextField, TextField } from '@yeonsubaek/yeonsui'
import UserForm from '../molecule/UserForm'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { signUpApi } from '@/apis/user'

function JoinForm() {
  const { t } = useTranslation('')
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const checkPassword = () => {
    return password.trim() === confirmPassword.trim()
  }

  const handleClickSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isCheckedPassword = checkPassword()

    if (isCheckedPassword) {
      await signUpApi(
        { email, password, nickname },
        {
          onSuccess: () => {
            alert('회원가입에 성공하였습니다.')
            router.push('/')
          },
          onError: (error: any) => {
            console.error(error)
          },
        }
      )
    } else {
      alert('비밀번호가 일치하지 않습니다.')
    }
  }

  return (
    <UserForm buttonName={t('user.button.join')} onClick={handleClickSubmit}>
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

export default JoinForm