const binId = '6830cef38a456b7966a487db';  // Tvůj JSONBin ID
const apiKey = '$2a$10$LZN36onOi89Sk2f8utU/1eTCQzArXTncqIw8fujmsjflHNh./6.O.';  // Tvůj API klíč

const filmsContainer = document.getElementById('films-container');

async function fetchFilms() {
  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
      headers: {
        'X-Master-Key': apiKey
      }
    });
    if (!response.ok) throw new Error('Nepodařilo se načíst data');
    const data = await response.json();
    return data.record.films;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function updateProgress() {
  const checkboxes = document.querySelectorAll('.seen-checkbox');
  const total = checkboxes.length;
  const seen = Array.from(checkboxes).filter(cb => cb.checked).length;
  const percent = total === 0 ? 0 : Math.round((seen / total) * 100);

  document.getElementById('seen-count').textContent = seen;
  document.getElementById('total-count').textContent = total;
  document.getElementById('seen-percent').textContent = `${percent}%`;
  document.getElementById('progress-bar').style.width = `${percent}%`;

  checkboxes.forEach(cb => {
    const filmDiv = cb.closest(".film");
    const filmName = cb.dataset.film;
    if (cb.checked) {
      filmDiv.classList.add("seen");
      localStorage.setItem(`film_${filmName}`, "true");
    } else {
      filmDiv.classList.remove("seen");
      localStorage.removeItem(`film_${filmName}`);
    }
  });
}

function createFilmElement(film) {
  const div = document.createElement("div");
  div.className = "film";

  div.innerHTML = `
    <img src="${film.image}" alt="${film.name}">
    <a href="${film.link}" target="_blank" rel="noopener noreferrer">${film.name}</a>
    <label>
      <input type="checkbox" class="seen-checkbox" data-film="${film.name}"> Viděno
    </label>
  `;

  const checkbox = div.querySelector(".seen-checkbox");

  // Načtení uloženého stavu z localStorage
  if (localStorage.getItem(`film_${film.name}`) === "true") {
    checkbox.checked = true;
    div.classList.add("seen");
  }

  checkbox.addEventListener("change", updateProgress);

  return div;
}

async function init() {
  const films = await fetchFilms();
  films.forEach(film => {
    const filmEl = createFilmElement(film);
    filmsContainer.appendChild(filmEl);
  });
  updateProgress();
}

init();
