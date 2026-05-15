import { readFile, writeFile } from 'node:fs/promises'
import { gzip } from 'node:zlib'
import { promisify } from 'node:util'
const gzipPromise = promisify(gzip) // note: gzip is a callback-based function

const filename = process.argv[2]

async function main () {
  try {
    console.time('gzip')
    const data = await readFile(filename)
    const gzippedData = await gzipPromise(data)
    await writeFile(`${filename}.gz`, gzippedData)
    console.timeEnd('gzip')
    console.log('File successfully compressed')
  } catch (error) {
    console.error('Error occurred while compressing file:', error)
  }
}

main()