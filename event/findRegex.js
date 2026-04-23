import { EventEmitter } from 'events';
import { readFile } from 'fs';

class FindRegex extends EventEmitter {
  constructor(regex) {
    super(); // Call the parent constructor, event emitter
    this.regex = regex;
    this.files = [];
  }

  addFile(file) {
    return this.files.push(file);
  }

  find() {
    for (const file of this.files) {
      readFile(file, 'utf-8', (err, content) => {
        if (err) {
          return this.emit('error', err);
        }
        this.emit('fileread', file);
        const match = content.match(this.regex);
        if (match) {
          match.forEach((m) => this.emit('found', file, m));
        }
      });
    }
  }
}


const findRegex = new FindRegex(/hello \w+/);

findRegex.on('fileread', (file) => {
  console.log(`Read file: ${file}`);
});

findRegex.on('found', (file, match) => {
  console.log(`Found "${match}" in file: ${file}`);
});

findRegex.on('error', (err) => {
  console.error('Error:', err);
});

findRegex.addFile('./file1.txt');
findRegex.addFile('./file2.txt');
findRegex.find();