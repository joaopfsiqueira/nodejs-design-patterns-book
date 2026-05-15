import { RandomStream } from './random-stream.js'

const randomStream = new RandomStream()
randomStream
  .on('data', (chunk) => { // only called when a new chunk of data is available
    console.log(`Chunk received (${chunk.length} bytes): ${chunk.toString()}`)
  })
  .on('end', () => {
    console.log(`Produced ${randomStream.emittedBytes} bytes of random data`)
  })