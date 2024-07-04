import { Button } from '@yeonsubaek/yeonsui'
import { FormEvent } from 'react'

interface UserFormProps {
  children: React.ReactNode | React.ReactNode[]
  buttonName: string
  onClick: () => void
}

function UserForm({ children, buttonName, onClick }: UserFormProps) {
  return (
    <div className="user-form">
      <div className="user-form-input">{children}</div>
      <Button onClick={onClick}>{buttonName}</Button>
    </div>
  )
}

export default UserForm
