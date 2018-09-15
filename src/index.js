const record = require("node-record-lpcm16");

const fuck = "fuck";

record
  .start({
    sampleRateHertz: 16000,
    threshold: 0,
    verbose: false,
    recordProgram: "rec",
    silence: "10.0",
  })
  .on("error", console.error)
  .pipe(fuck);

console.log("Listening, press Ctrl+C to stop.");
