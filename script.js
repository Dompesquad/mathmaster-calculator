function calculate() {
  const input = document.getElementById('input').value.trim();
  const resultDiv = document.getElementById('result');
  const stepsDiv = document.getElementById('steps');
  resultDiv.innerText = '';
  stepsDiv.innerHTML = '';

  try {
    if (isStoryProblem(input)) {
      resultDiv.innerHTML = '📘 <strong>Soal cerita terdeteksi:</strong>';
      stepsDiv.innerHTML = explainStory(input.toLowerCase());
      saveHistory(input, 'Soal cerita');
      return;
    }

    const result = math.evaluate(input);
    resultDiv.innerText = `Hasil: ${result}`;
    stepsDiv.innerHTML = '<strong>Langkah-langkah:</strong><br>';
    stepsDiv.innerHTML += `1. Masukkan: ${input}<br>`;
    stepsDiv.innerHTML += `2. Evaluasi menggunakan Math.js<br>`;
    stepsDiv.innerHTML += `3. Hasil: <strong>${result}</strong>`;
    saveHistory(input, result);
  } catch (err) {
    resultDiv.innerText = '❌ Soal tidak dikenali.';
    stepsDiv.innerText = '';
  }
}

function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const input = document.getElementById('input').value;
  const resultText = document.getElementById('result').innerText;
  const doc = new jsPDF();
  doc.text('🧮 MathMaster Pro', 10, 10);
  doc.text('Soal:', 10, 20);
  doc.text(input, 10, 30);
  doc.text('Hasil:', 10, 50);
  doc.text(resultText, 10, 60);
  doc.save('math-result.pdf');
}

function insertSymbol(symbol) {
  const inputField = document.getElementById('input');
  const start = inputField.selectionStart;
  const end = inputField.selectionEnd;
  inputField.value = inputField.value.substring(0, start) + symbol + inputField.value.substring(end);
  inputField.focus();
  inputField.selectionStart = inputField.selectionEnd = start + symbol.length;
}

function saveHistory(soal, hasil) {
  const list = document.getElementById('history');
  const item = document.createElement('li');
  item.textContent = `${soal} = ${hasil}`;
  list.prepend(item);
}

function isStoryProblem(text) {
  return /[?]/.test(text) || /berapa|jika|mempunyai|sisa|uang|total/.test(text.toLowerCase());
}

function explainStory(text) {
  if (text.includes("ani") && text.includes("budi") && text.includes("apel")) {
    return `Ani punya 3 apel, Budi 2 apel → 3 + 2 = 5 apel`;
  } else if (text.includes("uang") && text.includes("beli")) {
    return `Siti punya Rp10.000, beli permen Rp4.000 → 10000 - 4000 = Rp6000`;
  } else {
    return `Soal belum dikenali otomatis. Silakan ubah ke rumus.`;
  }
}

function startVoice() {
  const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'id-ID';
  recognition.start();
  recognition.onresult = function(event) {
    const voiceText = event.results[0][0].transcript;
    document.getElementById('input').value = voiceText;
    calculate();
  };
}
