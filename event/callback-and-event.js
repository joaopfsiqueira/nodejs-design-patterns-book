import { EventEmitter } from 'events';

function helloEvents() {
  const eventEmitter = new EventEmitter();

  setTimeout(() => {
    eventEmitter.emit('hello', 'Hello World!');
  }, 100);

  return eventEmitter;
}

function helloCallback(callback) {
  setTimeout(() => {
    callback('Hello World!');
  }, 100);
}

helloEvents().on('hello', (message) => {
  console.log('Event: ', message);
});

helloCallback((message) => {
  console.log('Callback: ', message);
});