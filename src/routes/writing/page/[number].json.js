import fs from 'fs'
import generateWritingList from '@/utils/generateWritingList.js'

export function get(req, res) {
  const { number } = req.params
  const postsPerPage = 10
  const totalPosts = fs.readdirSync('content/writing').length
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  res.end(JSON.stringify(
    {
      totalPages,
      posts: generateWritingList('content/writing', {
        start: ((number - 1) * postsPerPage),
        end: (number * (postsPerPage - 1))
      })
    }
  ))
}
