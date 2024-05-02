import { Button } from '@yeonsubaek/yeonsui'

interface UserFormProps {
  children: React.ReactNode | React.ReactNode[]
  buttonName: string
}

function UserForm({ children, buttonName }: UserFormProps) {
  return (
    <div className="user-form">
      <div className="user-form-input">{children}</div>
      <Button>{buttonName}</Button>
    </div>
  )
}

export default UserForm
