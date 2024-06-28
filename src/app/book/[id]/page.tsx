import BookPage from '@/components/book/BookPage'

function page({ params }: { params: { id: string } }) {
  return <BookPage id={params.id} />
}

export default page
