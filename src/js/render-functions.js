import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-button');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
});

export function createMarkup(hits, gallery) {
  const markup = hits
    .map(
      hit => `
    <a class="gallery-item" href="${hit.largeImageURL}">
      <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
      <div class="info">
        <p><span>Likes:</span> ${hit.likes}</p>
        <p><span>Views:</span> ${hit.views}</p>
        <p><span>Comments:</span> ${hit.comments}</p>
        <p><span>Downloads:</span> ${hit.downloads}</p>
      </div>
    </a>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery(gallery) {
  gallery.innerHTML = '';
}

export function showErrorMessage(message) {
  iziToast.error({
    title: 'Error',
    message,
  });
}

export function showLoadingIndicator() {
  loader.classList.remove('visually-hidden');
}

export function hideLoadingIndicator() {
  loader.classList.add('visually-hidden');
}

export function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('visually-hidden');
}

export function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('visually-hidden');
}