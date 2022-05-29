import { openPopupShowImage } from "./modals.js";
const galleryItemTemplate = document.querySelector('#gallery-item-template');

function likeButton () {
  this.classList.toggle('gallery__like-button_like');
}

function deleteButton () {
  this.closest('.gallery__item').remove();
}

function createGalleryItem (title, source) {
  const galleryItem = galleryItemTemplate.content.cloneNode(true);
  const galleryItemImage = galleryItem.querySelector('.gallery__image');
  galleryItemImage.src = source;
  galleryItemImage.alt = title;
  galleryItemImage.addEventListener('click', () => openPopupShowImage(title, source));
  galleryItem.querySelector('.gallery__title').textContent = title;
  galleryItem.querySelector('.gallery__like-button').addEventListener('click', likeButton);
  galleryItem.querySelector('.gallery__delete-button').addEventListener('click', deleteButton);
  return galleryItem;
}

export {galleryItemTemplate, likeButton, deleteButton, createGalleryItem};
