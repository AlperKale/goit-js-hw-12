import iziToast from 'izitoast';
import { fetchImages } from './js/pixabay-api.js';
import {
  showErrorMessage,
  createMarkup,
  clearGallery,
  showLoadingIndicator,
  hideLoadingIndicator,
  showLoadMoreBtn,
  hideLoadMoreBtn,
} from './js/render-functions.js';

const searchform = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-button');

searchform.addEventListener('submit', toSearch);
loadMoreBtn.addEventListener('click', toLoadMore);

let page = 1;
let searchQuery = null;

async function toSearch(event) {
  event.preventDefault();

  hideLoadMoreBtn();

  clearGallery(gallery);

  const inputValue = event.target.elements['search-text'].value.trim();
  searchQuery = inputValue;

  if (!inputValue) {
    showErrorMessage('You forgot important data');
    return;
  }

  page = 1;

  showLoadingIndicator();

  try {
    const { hits, totalHits } = await fetchImages(inputValue, page);
    if (!hits.length) {
      showErrorMessage(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }
    createMarkup(hits, gallery);

    if (gallery.querySelectorAll('a').length < totalHits) {
      showLoadMoreBtn();
    }
  } catch (error) {
    showErrorMessage('Failed to load images. Please try again!');
  } finally {
    hideLoadingIndicator();
  }
}

async function toLoadMore() {
  hideLoadMoreBtn();
  showLoadingIndicator();
  page += 1;

  try {
    const { hits, totalHits } = await fetchImages(searchQuery, page);
    createMarkup(hits, gallery);

    if (gallery.querySelectorAll('a').length < totalHits) {
      showLoadMoreBtn();
    } else {
      showErrorMessage(
        "We're sorry, but you've reached the end of search results."
      );
    }

    const card = document.querySelector('.gallery-item');
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    showErrorMessage('Failed to load images. Please try again!');
  } finally {
    hideLoadingIndicator();
  }
}