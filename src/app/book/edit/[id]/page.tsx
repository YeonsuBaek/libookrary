import EditBook from '@/components/book/EditBook'

function page({ params }: { params: { id: string } }) {
  return <EditBook id={params.id} />
}

export default page
