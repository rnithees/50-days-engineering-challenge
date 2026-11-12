const fs = require("node:fs");

fs.readFile(__filename, () => {
  console.log("I/O callback");

  setTimeout(() => {
    console.log("Timeout");
  }, 0);

  setImmediate(() => {
    console.log("Immediate");
  });
});