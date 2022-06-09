const textarea = document.querySelector("textarea")
const voiceList = document.querySelector("select")
const speechBtn = document.querySelector("button");

let synth = speechSynthesis;
function voices() {
    for (let v of synth.getVoices()) {
        let selected = v.name === "Google US English" ? "selected" : ""
        let option = `<option value="${v.name}" ${selected}>${v.name} ${v.lang}</option>`
        voiceList.insertAdjacentHTML("beforeEnd", option)
    }
}
// onload.voices()
synth.addEventListener("voiceschanged", voices)

function textToSpeech(text) {
    let utternance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        if (voice.name === voiceList.value) {
            utternance.voice = voice
        }
    }
    synth.speak(utternance);
}

let isSpeaking = true;

speechBtn.addEventListener("click", (e) => {
    e.preventDefault()
    if (textarea.value !== "") {
        if (!synth.speaking) {
            textToSpeech(textarea.value);
        }
        if (textarea.value.length > 80) {
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }
            else {
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechBtn.innerText = "Covert To Speech "
                    let icon = `<i class="fa fa-volume-up" aria-hidden="tru"></i>`
                    speechBtn.insertAdjacentHTML("beforeEnd", icon)
                }
            });
        }
        else {
            speechBtn.innerText = "Covert To Speech "
            let icon = `<i class="fa fa-volume-up" aria-hidden="tru"></i>`
            speechBtn.insertAdjacentHTML("beforeEnd", icon)
        }
    }
}) 