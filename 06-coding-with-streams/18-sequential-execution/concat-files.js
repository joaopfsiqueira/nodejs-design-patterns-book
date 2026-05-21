import { createReadStream, createWriteStream } from 'node:fs'
import { Readable, Transform } from 'node:stream'

export function concatFiles(dest, files) {
  return new Promise((resolve, reject) => {
    const destStream = createWriteStream(dest)
    Readable.from(files) // creates a readable stream from the array of file names
      .pipe(
        new Transform({ // the transform stream will read file names, create read streams for each file, and pipe them to the destination stream
          objectMode: true,
          transform(filename, _enc, done) {
            const src = createReadStream(filename)
            src.pipe(destStream, { end: false })
            // same as ((err) => done(err))
            // propagates the error
            src.on('error', done)
            // same as (() => done())
            // propagates correct completion
            src.on('end', done)
          },
        })
      )
      .on('error', err => {
        destStream.end()
        reject(err)
      })
      .on('finish', () => {
        destStream.end()
        resolve()
      })
  })
}
