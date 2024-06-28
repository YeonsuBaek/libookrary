import AddBook from '@/components/book/AddBook'

function page({ params }: { params: { id: string } }) {
  return <AddBook id={params.id} />
}

export default page
