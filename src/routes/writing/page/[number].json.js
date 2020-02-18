import generateWritingList from '@/utils/generateWritingList.js'

export function get(req, res) {
  const { number } = req.params
  const postsPerPage = 10

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  res.end(JSON.stringify(
    generateWritingList('content/writing', {
      start: ((number - 1) * postsPerPage),
      end: (number * (postsPerPage - 1))
    })
  ))
}
