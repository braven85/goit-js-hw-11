import Notiflix from 'notiflix';
const axios = require('axios').default;

const inputSearch = document.querySelector('input[name="searchQuery"]');
const searchButton = document.querySelector('button[type="submit"]');
const gallery = document.querySelector('.gallery');

async function fetchImages(name) {
  try {
    const res = await axios({
      method: 'get',
      url: `https://pixabay.com/api/?key=24785169-ce0e5464f046c25feb9965069&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`,
    });
    return res.data;
  } catch (error) {
    return Notiflix.Notify.failure('Oops! Error!');
  }
}

function clearResults() {
  gallery.innerHTML = '';
}

let foundImages = [];

searchButton.addEventListener('click', event => {
  event.preventDefault();
  clearResults();
  fetchImages(inputSearch.value).then(res => {
    if (inputSearch.value === '') {
      Notiflix.Notify.failure('Nie wiem czego mam szukać! Wpisz coś!');
    } else if (res.total === 0) {
      Notiflix.Notify.failure('Nie znalazłem żadnych obrazków!');
    } else {
      Notiflix.Notify.success(`Znalazłem ${res.total} obrazków!`);
      foundImages = res.hits;
      buildGallery();
    }
  });
});

function buildGallery() {
  foundImages.forEach(function (image) {
    const photoCard = document.createElement('div');
    photoCard.className = 'photo-card';
    photoCard.innerHTML = `
    <div class="photo">
    <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
    </div>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${image.likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${image.views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${image.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${image.downloads}
        </p>
      </div>`;
    gallery.append(photoCard);
  });
}