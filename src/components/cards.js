import { deleteCard, likeCard } from "./api.js";
import { openPopupShowImage } from "./modals.js";
import { profileData } from "./profile.js";
const galleryItemTemplate = document.querySelector('#gallery-item-template');

function likeButton () {
  this.removeEventListener('click', likeButton);
  const itemId = this.closest('.gallery__item').id;
  const counter = this.nextElementSibling;
  const method = this.classList.contains('gallery__like-button_like') ? 'DELETE' : 'PUT';
  likeCard(itemId, method).then((data) => {
    counter.textContent = data.likes.length;
    this.classList.toggle('gallery__like-button_like');
    this.addEventListener('click', likeButton);
  });
}

function deleteButton () {
  const item = this.closest('.gallery__item');
  deleteCard(item.id).then(() => { item.remove() });
}

function createGalleryItem (title, source, likes, id, userId) {
  const galleryItem = galleryItemTemplate.content.cloneNode(true);
  const galleryDeleteBtn = galleryItem.querySelector('.gallery__delete-button');
  const galleryItemImage = galleryItem.querySelector('.gallery__image');
  const galleryLikeBtn = galleryItem.querySelector('.gallery__like-button');

  galleryItemImage.src = source;
  galleryItemImage.alt = title;
  galleryItemImage.addEventListener('click', () => openPopupShowImage(title, source));
  galleryItem.querySelector('.gallery__title').textContent = title;
  galleryLikeBtn.addEventListener('click', likeButton);
  galleryDeleteBtn.closest('.gallery__item').id = id;

  galleryItem.querySelector('.gallery__like-counter').textContent = likes.length;
  if (likes.some((element) => element._id === profileData._id)) {
    galleryLikeBtn.classList.add('gallery__like-button_like');
  }

  if (userId === profileData._id) {
    galleryDeleteBtn.addEventListener('click', deleteButton);
    galleryDeleteBtn.classList.add('gallery__delete-button_active');
  }

  return galleryItem;
}

export {galleryItemTemplate, likeButton, deleteButton, createGalleryItem};
