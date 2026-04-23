import { EventEmitter } from 'events';

function ticker(number, callback) {
  const eventEmitter = new EventEmitter();
  let count = 0;
  const start = Date.now();
  const endTime = start + number;

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