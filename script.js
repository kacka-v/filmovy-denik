const binId = '6830ccef8960c979a5a048ef';
const binId = '6830cef38a456b7966a487db';
const apiKey = '$2a$10$LZN36onOi89Sk2f8utU/1eTCQzArXTncqIw8fujmsjflHNh./6.O.';
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
