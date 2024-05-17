import PageTitle from '@/components/common/PageTitle'

interface AccountLayoutProps {
  children: React.ReactNode | React.ReactNode[]
}

function layout({ children }: AccountLayoutProps) {
  return (
    <div className="account">
      <PageTitle route="user.info" />
      {children}
    </div>
  )
}

export default layout
