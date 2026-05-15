import { Readable } from 'stream'
import Chance from 'chance'

const chance = new Chance()

export class RandomStream extends Readable {
  constructor (options) {
    super(options)
    this.emittedBytes = 0
  }


  _read (size) {
    const chunk = chance.string({ length: size }) // construct a random string of the requested size
    this.push(chunk, 'utf8') // push the chunk to the internal buffer
    this.emittedBytes += chunk.length // keep track of the total number of emitted bytes
    if (chance.bool({ likelihood: 5 })) { // randomly end the stream with a 5% chance
      this.push(null) // signal the end of the stream
    }
  }
}