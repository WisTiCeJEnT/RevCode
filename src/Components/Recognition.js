window.SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;

let recognition = new window.SpeechRecognition();
recognition.lang = "en-US";
recognition.lang = "th-TH";
recognition.interimResults = true;
recognition.maxAlternatives = 10;
recognition.continuous = true;

export default recognition