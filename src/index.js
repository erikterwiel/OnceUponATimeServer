const fs = require("fs");
const record = require("node-record-lpcm16");
const Watson = require("watson-developer-cloud/speech-to-text/v1");
const key = require("./keys/watson");

const watson = new Watson({
  iam_apikey: key,
  url: "https://gateway-wdc.watsonplatform.net/speech-to-text/api",
});

const params = {
  audio: fs.createReadStream("./test.wav"),
  content_type: "audio/wav",
};

// watson.recognize(params, (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(JSON.stringify(res, null, 2));
//   }
// });

fs.createReadStream("./test.wav")
  .pipe(watson.recognizeUsingWebSocket({ content_type: "audio/wav; continuous=true" }))
  .pipe(process.stdout);

// record
//   .start({
//     sampleRateHertz: 16000,
//     threshold: 0.5,
//     verbose: true,
//     recordProgram: "rec",
//     silence: "2.0",
//   })
//   .on("error", console.error)
//   .pipe(watson.recognizeUsingWebSocket({ content_type: "audio/wav" }))
//   .pipe(process.stdout);
//   .pipe(fs.createWriteStream("./transcription.txt"));

record
  .start({
    sampleRateHertz: 16000,
    thresholdStart: 0.5,
    thresholdEnd: 0.5,
    verbose: true,
    recordProgram: "rec",
    silence: "2.0",
  })
  .pipe(fs.createWriteStream("test.wav", { encoding: "binary" }));

console.log("Listening, press Ctrl+C to stop.");
