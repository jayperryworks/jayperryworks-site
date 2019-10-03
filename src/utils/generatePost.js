import fs from 'fs'
import path from 'path'

export default function generatePost (filePath) {
  return fs.readFileSync(
    filePath,
    {encoding: 'utf-8'},
    (err, data) => {
      if (err) {
        return false
      }

      return JSON.stringify(data.json())
    }
  )
}
