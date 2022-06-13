import { deleteCard, likeCard } from "./api.js";
import { openPopupShowImage } from "./modals.js";
import { userId } from "./index.js";
const galleryItemTemplate = document.querySelector('#gallery-item-template');

function likeButton (evt) {
  evt.target.disabled = true;
  const itemId = evt.target.closest('.gallery__item').id;
  const counter = evt.target.nextElementSibling;
  const method = evt.target.classList.contains('gallery__like-button_like') ? 'DELETE' : 'PUT';
  likeCard(itemId, method).then((data) => {
    counter.textContent = data.likes.length;
    evt.target.classList.toggle('gallery__like-button_like');
    evt.target.disabled = false;
  }).catch((err) => console.log(`Ошибка лайка карточки: ${err}`));
}

function deleteButton (evt) {
  const item = evt.target.closest('.gallery__item');
  deleteCard(item.id).then(() => { item.remove() }).catch((err) => console.log(`Ошибка удаления карточки: ${err}`));
}

function createGalleryItem (title, source, likes, id, ownerId) {
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
  if (likes.some((element) => element._id === userId)) {
    galleryLikeBtn.classList.add('gallery__like-button_like');
  }

  if (ownerId === userId) {
    galleryDeleteBtn.addEventListener('click', deleteButton);
    galleryDeleteBtn.classList.add('gallery__delete-button_active');
  }

  return galleryItem;
}

export {galleryItemTemplate, likeButton, deleteButton, createGalleryItem};
