import { createReadStream, createWriteStream } from 'fs'
import { createGzip } from 'zlib'

const filename = process.argv[2]

async function main () {
  createReadStream(filename)
    .pipe(createGzip())
    .pipe(createWriteStream(`${filename}.gz`))
    .on('finish', () => console.log('File successfully compressed'))
    .on('error', (error) => console.error('Error occurred while compressing file:', error))
}

main()