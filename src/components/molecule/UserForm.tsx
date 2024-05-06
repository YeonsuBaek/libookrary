import { Button } from '@yeonsubaek/yeonsui'
import { FormEvent } from 'react'

interface UserFormProps {
  children: React.ReactNode | React.ReactNode[]
  buttonName: string
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

function UserForm({ children, buttonName, onSubmit }: UserFormProps) {
  return (
    <div className="user-form">
      <div className="user-form-input">{children}</div>
      <Button onClick={onSubmit}>{buttonName}</Button>
    </div>
  )
}

export default UserForm
