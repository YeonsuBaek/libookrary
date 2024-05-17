import PageTitle from '@/components/common/PageTitle'
import LoginForm from '@/components/user/form/LoginForm'
import LoginButtons from '@/components/user/buttons/LoginButtons'

function page() {
  return (
    <div className="login">
      <PageTitle route="user.login" />
      <LoginForm />
      <LoginButtons />
    </div>
  )
}

export default page
