
const fs = require("node:fs");

console.log("1. Synchronous: Start");

process.nextTick(() => {
  console.log("2. Next Tick");
});

Promise.resolve().then(() => {
  console.log("3. Promise Microtask");
});

setTimeout(() => {
  console.log("4. Timer");

  process.nextTick(() => {
    console.log("5. Timer Next Tick");
  });

  Promise.resolve().then(() => {
    console.log("6. Timer Promise");
  });
}, 0);

setImmediate(() => {
  console.log("7. Immediate");
});

fs.readFile(__filename, () => {
  console.log("8. File I/O");

  process.nextTick(() => {
    console.log("9. I/O Next Tick");
  });

  Promise.resolve().then(() => {
    console.log("10. I/O Promise");
  });
});

console.log("11. Synchronous: End");
