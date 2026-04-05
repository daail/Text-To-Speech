// let speech = new SpeechSynthesisUtterance();

// let voices = [];

// let voiceSelect = document.querySelector("select");

// window.speechSynthesis.onvoiceschanged = () => {

//   voices = window.speechSynthesis.getVoices();

//   speech.voice = voices[0];

//   voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
// };

// voiceSelect.addEventListener("change", () => {
//   speech.voice = voices[voiceSelect.value];
// });

// document.querySelector("button").addEventListener("click", () => {

//   speech.text = document.querySelector("textarea").value;

//   window.speechSynthesis.speak(speech);
// });
let speech = new SpeechSynthesisUtterance();
let voices = [];

// 1. Grab elements based on your exact HTML
let voiceSelect = document.querySelector("select");
let speakBtn = document.querySelector("button");
let textInput = document.getElementById("input-field");

// 2. Load and filter Microsoft voices
window.speechSynthesis.onvoiceschanged = () => {
  let allVoices = window.speechSynthesis.getVoices();
  voices = allVoices.filter(voice => voice.name.includes("Microsoft"));
  if (voices.length == 0) {
      voices = allVoices.slice(0, 4);
  }
  voiceSelect.innerHTML = "";
  voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
  speech.voice = voices[0];
};
voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});
speakBtn.addEventListener("click", () => {
  if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      speakBtn.innerHTML = '<img src="images/play.png">Listen'; 
      
  } else {
      if (textInput.value.trim().length > 0) {
          speech.text = textInput.value;
          window.speechSynthesis.speak(speech);
          speakBtn.innerHTML = '<img src="images/stop.svg">Stop';
      } else {
          alert("Please enter some text first!");
      }
  }
});
speech.onend = () => {
  speakBtn.innerHTML = '<img src="images/play.png">Listen';
};