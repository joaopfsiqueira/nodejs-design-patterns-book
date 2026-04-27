import { EventEmitter } from 'events';

function ticker(number, callback) {
  const eventEmitter = new EventEmitter();
  const start = Date.now();
  let count = 0;
  const endTime = start + number;
  eventEmitter.emit('tick', number);

  // check if the start time is divisible by 5, emit an error if it is
  if (start % 5 === 0) {
    eventEmitter.emit('error', new Error('Timestamp is divisible by 5'));
  }


  function emitTick() {
    if (Date.now() < endTime) {
      count += 1;
      eventEmitter.emit('tick', count);
      setTimeout(emitTick, 50);
    }
  }

  setTimeout(emitTick, 50);
  setTimeout(() => callback(count), number);
  return eventEmitter;
}

ticker(220, (count) => {
  console.log('Ticker callback count:', count);
}).on('tick', (tickCount) => {
  console.log('Tick event:', tickCount);
});