import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import { urlToFilename } from './utils.js'

export function spider (url, cb) {
  const filename = urlToFilename(url)
  fs.access(filename, err => { // [1] this checks if the file exists and is readable
    if (err && err.code === 'ENOENT') {
      console.log(`Downloading ${url} into ${filename}`)
      superagent.get(url).end((err, res) => { // [2] this makes an HTTP GET request to the URL
        if (err) { // [2] if there is an error in the HTTP request, we call the callback with the error
          cb(err)
        } else {
          mkdirp(path.dirname(filename), err => { // [3] this creates the directory structure for the filename if it doesn't exist
            if (err) { // [3] if there is an error creating the directory, we call the callback with the error
              cb(err)
            } else {
              fs.writeFile(filename, res.text, err => { // [4] this writes the response text to the file
                if (err) { // [4] if there is an error writing the file, we call the callback with the error
                  cb(err)
                } else {
                  cb(null, filename, true)
                }
              })
            }
          })
        }
      })
    } else {
      cb(null, filename, false)
    }
  })
}