function delay (milliseconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date())
    }, milliseconds)
  })
}

async function playingWithDelays () {
  console.log('Delaying...', new Date())

  const dateAfterOneSecond = await delay(1000)
  console.log(dateAfterOneSecond)

  const dateAfterThreeSeconds = await delay(3000)
  console.log(dateAfterThreeSeconds)

  return 'done'
}
// top-level await is supported in ES modules, but not in CommonJS modules, so we can only use it if we run this file with the --experimental-modules flag and give it a .mjs extension
const result = await playingWithDelays()
console.log(`After 4 seconds: ${result}`)