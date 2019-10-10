import generatePost from '../../../utils/generatePost.js'

export function get(req, res, next) {
  const { year, slug } = req.params
  const header = {
    'Content-Type': 'application/json'
  }
  let json = JSON.stringify(generatePost(`content/pictures/${year}-${slug}.yml`))

  if (!json) {
    res.writeHead(404, header)
    res.end(JSON.stringify({
      message: 'Oh dear, this bicycle has gone rubber-side-up. Much appreciated if you could let <a href="https://twitter.com/inkpixelswords" target="_blank">@inkpixelswords</a> know.'
    }))
  }

  res.writeHead(200, header)
  res.end(json)
}
