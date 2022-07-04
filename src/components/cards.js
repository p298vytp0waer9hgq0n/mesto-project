import { deleteCard, likeCard } from "./api.js";
import { openPopupShowImage } from "./modals.js";
import { userId } from "./index.js";

export class Card {
  constructor (title, source, likes, id, ownerId, templateSelector) {
    this._title = title;
    this._source = source;
    this._likes = likes;
    this._id = id;
    this._ownerId = ownerId;
    this._template = templateSelector;
  }

  _likeButtonListener (evt) {
    evt.target.disabled = true;
    const method = evt.target.classList.contains('gallery__like-button_like') ? 'DELETE' : 'PUT';
    likeCard(this._id, method).then((data) => {
      this._counter.textContent = data.likes.length;
      evt.target.classList.toggle('gallery__like-button_like');
    }).catch((err) => console.log(`Ошибка лайка карточки: ${err}`))
    .finally(() => evt.target.disabled = false);
  }

  _deleteButtonListener (evt) {
    deleteCard(this._id).then(() => { this.item.remove() }).catch((err) => console.log(`Ошибка удаления карточки: ${err}`))
  }

  _initTemplate () {
    this.item = this._template.content.cloneNode(true).firstElementChild;
    this._deleteBtn = this.item.querySelector('.gallery__delete-button');
    this._likeBtn = this.item.querySelector('.gallery__like-button');
    this._image = this.item.querySelector('.gallery__image');
    this._counter = this.item.querySelector('.gallery__like-counter');
    this._titleElem = this.item.querySelector('.gallery__title');
  }

  _addListeners () {
    this._image.addEventListener('click', () => openPopupShowImage(this._title, this._source));
    this._likeBtn.addEventListener('click', this._likeButtonListener.bind(this));
    if (this._ownerId === userId) {
      this._deleteBtn.addEventListener('click', this._deleteButtonListener.bind(this));
    }
  }

  createItem () {
    this._initTemplate();
    this._image.src = this._source;
    this._image.alt = this._title;
    this._titleElem.textContent = this._title;
    this._counter.textContent = this._likes.length;
    if (this._likes.some((element) => element._id === userId)) {
      this._likeBtn.classList.add('gallery__like-button_like');
    }
    if (this._ownerId === userId) {
      this._deleteBtn.classList.add('gallery__delete-button_active');
    }

    this._addListeners();

    return this.item;
  }
}
/*
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
*/

// export {likeButton, deleteButton }
