// ----- Diccionario Inglés -----
const searchInput = document.getElementById('searchInput');
const resultDiv = document.getElementById('result');
const closeBtn = document.getElementById('closeBtn');
closeBtn.addEventListener('click', () => {
  searchInput.value = '';
  resultDiv.innerHTML = `<p class="info">Escribe una palabra en inglés y presiona Enter para buscar su significado.</p>`;
  searchInput.focus();
});
searchInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    const word = searchInput.value.trim();
    if (word) {
      fetchMeaningEN(word);
    }
  }
});
async function fetchMeaningEN(word) {
  resultDiv.innerHTML = `<p class="info">Buscando "${word}"...</p>`;
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) {
      throw new Error('No se encontró la palabra');
    }
    const data = await response.json();
    displayMeaningEN(data);
  } catch (error) {
    resultDiv.innerHTML = `<p class="error">No se encontró la palabra "${word}". Por favor intenta con otra.</p>`;
  }
}
function displayMeaningEN(data) {
  const entry = data[0];
  const word = entry.word;
  const phonetic = entry.phonetic || (entry.phonetics && entry.phonetics[0]?.text) || '';
  const meanings = entry.meanings;
  let html = `<div class="word">${word}</div>`;
  if (phonetic) {
    html += `<div class="phonetic">${phonetic}</div>`;
  }
  meanings.forEach(meaning => {
    html += `<div class="meaning-section">`;
    html += `<div class="meaning-title">${meaning.partOfSpeech}</div>`;
    meaning.definitions.forEach(def => {
      html += `<div class="meaning-list">• ${def.definition}</div>`;
      if(def.example) {
        html += `<div class="example">Ejemplo: "${def.example}"</div>`;
      }
      if(def.synonyms && def.synonyms.length > 0) {
        html += `<div class="synonyms">Sinónimos: ${def.synonyms.slice(0,6).map(s => `<span>${s}</span>`).join(', ')}</div>`;
      }
    });
    html += `</div>`;
  });
  resultDiv.innerHTML = html;
}
// ----- Diccionario Español -----
const searchInputEs = document.getElementById('searchInputEs');
const resultDivEs = document.getElementById('resultEs');
const closeBtnEs = document.getElementById('closeBtnEs');
closeBtnEs.addEventListener('click', () => {
  searchInputEs.value = '';
  resultDivEs.innerHTML = `<p class="info">Escribe una palabra en español y presiona Enter para buscar su significado.</p>`;
  searchInputEs.focus();
});
searchInputEs.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    const word = searchInputEs.value.trim();
    if (word) {
      fetchMeaningES(word);
    }
  }
});
async function fetchMeaningES(word) {
  resultDivEs.innerHTML = `<p class="info">Buscando "${word}"...</p>`;
  try {
    // Usamos la API pública del diccionario para español:
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/es/${word}`);
    if (!response.ok) {
      throw new Error('No se encontró la palabra');
    }
    const data = await response.json();
    displayMeaningES(data);
  } catch (error) {
    resultDivEs.innerHTML = `<p class="error">No se encontró la palabra "${word}". Por favor intenta con otra.</p>`;
  }
}
function displayMeaningES(data) {
  const entry = data[0];
  const word = entry.word;
  const phonetic = entry.phonetic || (entry.phonetics && entry.phonetics[0]?.text) || '';
  const meanings = entry.meanings;
  let html = `<div class="word">${word}</div>`;
  if (phonetic) {
    html += `<div class="phonetic">${phonetic}</div>`;
  }
  meanings.forEach(meaning => {
    html += `<div class="meaning-section">`;
    html += `<div class="meaning-title">${meaning.partOfSpeech}</div>`;
    meaning.definitions.forEach(def => {
      html += `<div class="meaning-list">• ${def.definition}</div>`;
      if(def.example) {
        html += `<div class="example">Ejemplo: "${def.example}"</div>`;
      }
      if(def.synonyms && def.synonyms.length > 0) {
        html += `<div class="synonyms">Sinónimos: ${def.synonyms.slice(0,6).map(s => `<span>${s}</span>`).join(', ')}</div>`;
      }
    });
    html += `</div>`;
  });
  resultDivEs.innerHTML = html;
}