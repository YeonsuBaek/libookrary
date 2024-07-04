import PageTitle from '@/components/common/PageTitle'
import JoinForm from '@/components/user/form/JoinForm'

function page() {
  return (
    <div className="join">
      <PageTitle route="user.join" />
      <JoinForm />
    </div>
  )
}

export default page
