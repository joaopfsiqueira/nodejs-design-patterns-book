import { randomBytes } from 'crypto'

function promisify (callbackBasedApi) {
  console.log(`Promisifying ${callbackBasedApi.name}...`)
  // Return a new function that returns a promise instead of using a callback to handle the result or error of the original function.
  // as the original function is called with the arguments passed to the new function, plus a callback that resolves or rejects the promise based on the result of the original function.
  return function promisified (...args) {
    return new Promise((resolve, reject) => {
      const newArgs = [
        ...args,
        function (err, result) {
          if (err) {
            return reject(err)
          }

          resolve(result)
        }
      ]
      callbackBasedApi(...newArgs)
    })
  }
}

const randomBytesP = promisify(randomBytes)
randomBytesP(32)
  .then(buffer => {
    console.log(`Random bytes: ${buffer.toString()}`)
  })