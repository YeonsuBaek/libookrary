export default async function async(req: any, res: any) {
  const { search, startIndex } = req.query
  try {
    const KEY = process.env.ALADIN_KEY
    const aladinAPIUrl = `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${KEY}&Query=${search}&QueryType=Title&MaxResults=20&start=${startIndex}&SearchTarget=Book&Output=js&Version=20131101`
    const response = await fetch(aladinAPIUrl)

    if (!response.ok) {
      throw new Error('Failed to fetch data from Aladin API')
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Error: ' + error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
