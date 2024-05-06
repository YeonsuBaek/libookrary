import PageTitle from '@/components/atom/PageTitle'
import JoinForm from '@/components/organism/JoinForm'

function page() {
  return (
    <div className="join">
      <PageTitle route="user.join" />
      <JoinForm />
    </div>
  )
}

export default page
