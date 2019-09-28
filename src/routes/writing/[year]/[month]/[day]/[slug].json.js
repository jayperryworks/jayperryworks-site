import path from 'path'
import fs from 'fs'

export function get(req, res, next) {
  const { year, month, day, slug } = req.params

  const filePath = path.join(__dirname, `content/writing/${year}-${month}-${day}-${slug}.json`)

  fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err) {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      res.end(JSON.stringify(data.json()));
    } else {
      res.writeHead(404, {
        'Content-Type': 'application/json'
      });

      res.end(JSON.stringify({
        message: `Not found: ${err}`
      }));
    }
  })

  // axios.get(filePath)
  //   .then((data) => {
  //     res.writeHead(200, {
  //       'Content-Type': 'application/json'
  //     });

  //     res.end(JSON.stringify(data.json()));
  //   })
  //   .catch((error) => {
  //     res.writeHead(404, {
  //       'Content-Type': 'application/json'
  //     });

  //     res.end(JSON.stringify({
  //       message: `Not found: ${error}`
  //     }));
  //   })
}
