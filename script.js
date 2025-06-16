function calculate() {
  const input = document.getElementById('input').value;
  const resultDiv = document.getElementById('result');
  try {
    const result = math.evaluate(input);
    resultDiv.innerText = `Hasil: ${result}`;
  } catch (err) {
    resultDiv.innerText = '❌ Soal tidak dikenali atau ada kesalahan input.';
  }
}

function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const input = document.getElementById('input').value;
  const resultText = document.getElementById('result').innerText;

  const doc = new jsPDF();
  doc.text('🧮 MathMaster Calculator', 10, 10);
  doc.text('Soal:', 10, 20);
  doc.text(input, 10, 30);
  doc.text('Hasil:', 10, 50);
  doc.text(resultText, 10, 60);
  doc.save('hasil-matematika.pdf');
}
