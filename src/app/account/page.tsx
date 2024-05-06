import PageTitle from '@/components/atom/PageTitle'
import AccountButtons from '@/components/organism/AccountButtons'
import AccountInfo from '@/components/organism/AccountInfo'

function page() {
  return (
    <div className="account">
      <PageTitle route="user.info" />
      <AccountInfo />
      <AccountButtons />
    </div>
  )
}

export default page
