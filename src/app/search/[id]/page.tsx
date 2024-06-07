import SearchResult from '@/components/common/Search/SearchResult'

function page({ params }: { params: { id: string } }) {
  return <SearchResult searchParam={params.id} />
}

export default page
