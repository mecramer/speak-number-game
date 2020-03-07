// Speech recognition API, https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

// Get DOM hooks
const msgEl = document.querySelector('#msg');

const randomNum = getRandomNumber();

// console.log('Number:', randomNum);

// we need to initialize a speech recognition object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// now we create an instance of the object
let recognition = new window.SpeechRecognition();

// start recognition
recognition.start();

// Capture user speak, and its an event, we need to pass e
// what we said it located in results and an array in that (speechRecognitionResult)
//   and an array inside that (speechRecognitonAlternative), and then the tanscript property
//   that gets  us e.results[0][0].transcript
function onSpeak(e) {
  // console.log(e);
  const msg = e.results[0][0].transcript;
  // console.log(msg);
  // writeMessage(msg);
  // checkNumber(msg);
}

// get a random number 1 through 99
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Speak result, when the recognition object gets a result, fire  onSpeak() function
recognition.addEventListener('result', onSpeak);