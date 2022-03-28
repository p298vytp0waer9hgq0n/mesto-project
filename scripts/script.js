//Константы
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const galleryList = document.querySelector('.gallery__list');

// Установка листенеров для существующих элементов
document.querySelector('.profile__add').addEventListener('click', openPopupNewPlace);
document.querySelector('.profile__edit').addEventListener('click', openPopupEditProfile);
document.querySelector('.popup__form_type_edit-profile').addEventListener('submit', submitProfile);
document.querySelector('.popup__form_type_new-place').addEventListener('submit', submitPlace);
for (const butt of document.querySelectorAll('.popup__close')) {
  butt.addEventListener('click', closePopup);
}

//Население галереи
for (const card of initialCards) {
  galleryList.append(createGalleryItem(card.name, card.link));
}


//Функции открытия попапов
function openPopupNewPlace () {
  document.querySelector('.popup_type_new-place').classList.add('popup_active');
}

function openPopupEditProfile () {
  const editPopup = document.querySelector('.popup_type_edit-profile');
  editPopup.querySelector('#name').value = document.querySelector('.profile__name').textContent;
  editPopup.querySelector('#description').value = document.querySelector('.profile__description').textContent;
  editPopup.classList.add('popup_active');
}

function openPopupShowImage (evt) {
  const imagePopup = document.querySelector('.popup_type_show-image');
  const imagePopupImage = imagePopup.querySelector('.popup__image');
  imagePopupImage.src = evt.target.src;
  imagePopupImage.alt = evt.target.alt;
  imagePopup.querySelector('.popup__image-description').textContent = evt.target.alt;
  imagePopup.classList.add('popup_active');
}

//Функции закрытия попапов
function submitProfile (evt) {
  document.querySelector('.profile__name').textContent = evt.target.querySelector('#name').value;
  document.querySelector('.profile__description').textContent = evt.target.querySelector('#description').value;
  closePopup(evt);
  evt.preventDefault();
}

function submitPlace (evt) {
  galleryList.prepend(createGalleryItem(evt.target.querySelector('#picture-name').value, evt.target.querySelector('#picture-address').value));
  closePopup(evt);
  evt.preventDefault();
}

function closePopup (evt) {
  evt.target.closest('.popup').classList.remove('popup_active');
  for (const elem of evt.target.closest('.popup').querySelectorAll('.popup__input')) {
    elem.value = '';
  }
}

//Функции кнопочек
function likeButton () {
  this.classList.toggle('gallery__like-button_like');
}

function deleteButton () {
  this.closest('.gallery__item').remove();
}

//Функция создания карточки галереи
function createGalleryItem (title, source) {
  const galleryItem = document.querySelector('#gallery-item-template').content.cloneNode(true);
  const galleryItemImage = galleryItem.querySelector('.gallery__image');
  galleryItemImage.src = source;
  galleryItemImage.alt = title;
  galleryItemImage.addEventListener('click', openPopupShowImage);
  galleryItem.querySelector('.gallery__title').textContent = title;
  galleryItem.querySelector('.gallery__like-button').addEventListener('click', likeButton);
  galleryItem.querySelector('.gallery__delete-button').addEventListener('click', deleteButton);
  return galleryItem;
}
