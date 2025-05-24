const binId = 'TVŮJ_BIN_ID';
const apiKey = 'TVŮJ_API_KLÍČ';
const url = `https://api.jsonbin.io/v3/b/${binId}/latest`;

fetch(url, {
  headers: {
    'X-Master-Key': apiKey
  }
})
  .then(response => response.json())
  .then(data => {
    const films = data.record;
    const filmList = document.getElementById('film-list');

    films.forEach(film => {
      const card = document.createElement('div');
      card.className = 'film-card';

      const img = document.createElement('img');
      img.src = film.image;
      img.alt = film.title;

      const link = document.createElement('a');
      link.href = film.csfd;
      link.target = '_blank';
      link.textContent = film.title;

      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = film.seen;
      checkbox.addEventListener('change', () => {
        film.seen = checkbox.checked;
        updateData(films);
      });

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode('Viděno'));

      card.appendChild(img);
      card.appendChild(link);
      card.appendChild(label);

      filmList.appendChild(card);
    });
  })
  .catch(error => console.error('Chyba při načítání dat:', error));

function updateData(films) {
  fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': apiKey,
      'X-Bin-Versioning': 'false'
    },
    body: JSON.stringify(films)
  })
    .then(response => response.json())
    .then(data => console.log('Data byla aktualizována:', data))
    .catch(error => console.error('Chyba při aktualizaci dat:', error));
}
