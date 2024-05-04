interface PageTitleProps {
  children: React.ReactNode
}

function PageTitle({ children }: PageTitleProps) {
  return <h2 className="title">{children}</h2>
}

export default PageTitle
