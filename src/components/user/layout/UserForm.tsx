import { Button } from '@yeonsubaek/yeonsui'

interface UserFormProps {
  children: React.ReactNode | React.ReactNode[]
  buttonName: string
  onClick: () => void
  isSending?: boolean
}

function UserForm({ children, buttonName, onClick, isSending = false }: UserFormProps) {
  return (
    <div className="user-form">
      <div className="user-form-input">{children}</div>
      <Button styleType="filled" styleVariant="primary" onClick={onClick} disabled={isSending}>
        {buttonName}
      </Button>
    </div>
  )
}

export default UserForm
