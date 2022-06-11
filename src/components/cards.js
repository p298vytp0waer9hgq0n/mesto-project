import { deleteCard } from "./api.js";
import { openPopupShowImage } from "./modals.js";
import { profileData } from "./profile.js";
const galleryItemTemplate = document.querySelector('#gallery-item-template');

function likeButton () {
  this.classList.toggle('gallery__like-button_like');
}

function deleteButton () {
  const item = this.closest('.gallery__item');
  deleteCard(item.id).then(() => { item.remove() });
}

function createGalleryItem (title, source, id, userId) {
  const galleryItem = galleryItemTemplate.content.cloneNode(true);
  const galleryDeleteBtn = galleryItem.querySelector('.gallery__delete-button');
  const galleryItemImage = galleryItem.querySelector('.gallery__image');
  galleryItemImage.src = source;
  galleryItemImage.alt = title;
  galleryItemImage.addEventListener('click', () => openPopupShowImage(title, source));
  galleryItem.querySelector('.gallery__title').textContent = title;
  galleryItem.querySelector('.gallery__like-button').addEventListener('click', likeButton);
  if (userId === profileData._id) {
    galleryDeleteBtn.closest('.gallery__item').id = id;
    galleryDeleteBtn.addEventListener('click', deleteButton);
    galleryDeleteBtn.classList.add('gallery__delete-button_active');
  }
  return galleryItem;
}

export {galleryItemTemplate, likeButton, deleteButton, createGalleryItem};
