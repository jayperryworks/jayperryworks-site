import fs from 'fs'

export default function generatePost (filePath) {
  return fs.readFileSync(
    filePath,
    {encoding: 'utf-8'},
    (err, data) => {
      if (err) {
        return false
      }

      return data.json()
    }
  )
}
