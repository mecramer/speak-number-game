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
  writeMessage(msg);
  checkNumber(msg);
}

// Write what user  speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
  `;
}

// Check message agains number
// convert message to a number, with the + and asisgn to num
function checkNumber(msg) {
  const num = +msg;

  // check if valid number
  if(Number.isNaN(num)) {
    msgEl.innerHTML += `<div>This is not a valid number.</div>`;
    return;
  }

  // check if number is in range
  if(num > 100 || num < 1) {
    msgEl.innerHTML += `<div>Number must be  between 1 and 100</div>`;
    return;
  }

  // check number
  if(num === randomNum) {
    document.body.innerHTML += `
      <h2>Contrats! You have guessed the number!<br><br>
      It was ${num};</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num < randomNum) {
    msgEl.innerHTML += `<div>GO HIGHER</div>`;
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div>GO LOWER</div>`;
  }
}

// get a random number 1 through 99
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Speak result, when the recognition object gets a result, fire  onSpeak() function
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start());

// Start game over
document.body.addEventListener('click', (e) => {
  if(e.target.id == 'play-again') {
    window.location.reload();
  }
});