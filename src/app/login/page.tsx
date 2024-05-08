import PageTitle from '@/components/atom/PageTitle'
import LoginForm from '@/components/organism/LoginForm'
import LoginButtons from '@/components/organism/LoginButtons'

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
