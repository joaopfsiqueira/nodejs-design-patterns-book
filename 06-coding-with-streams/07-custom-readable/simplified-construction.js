import { Readable } from 'stream'
import Chance from 'chance'

// this code is functionally equivalent to the implementation of RandomStream in random-stream.js, but it uses the simplified constructor form of Readable streams, where we pass the implementation of the _read method directly as an option to the constructor, instead of defining a custom class that extends Readable and implements the _read method.
const chance = new Chance()
let emittedBytes = 0

const randomStream = new Readable({
  read (size) {
    const chunk = chance.string({ length: size })
    this.push(chunk, 'utf8')
    emittedBytes += chunk.length
    if (chance.bool({ likelihood: 5 })) {
      this.push(null)
    }
  }
})

randomStream
  .on('data', (chunk) => {
    console.log(`Chunk received (${chunk.length} bytes): ${chunk.toString()}`)
  })
  .on('end', () => {
    console.log(`Produced ${emittedBytes} bytes of random data`)
  })