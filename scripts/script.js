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

document.querySelector('.profile__add').addEventListener('click', openPopupNewPlace);
document.querySelector('.profile__edit').addEventListener('click', openPopupEditProfile);
document.querySelector('.popup__form_type_edit-profile').addEventListener('submit', submitProfile);
document.querySelector('.popup__form_type_new-place').addEventListener('submit', submitPlace);

for (const butt of document.querySelectorAll('.popup__close')) {
  butt.addEventListener('click', closePopup);
}

for (const like of document.querySelectorAll('.gallery__like-button')) {
  like.addEventListener('click', likeButton);
}

for (const card of initialCards) {
  addGalleryItem(card.name, card.link);
}

function openPopupNewPlace () {
  document.querySelector('.popup_type_new-place').classList.add('popup_active');
}

function openPopupEditProfile () {
  document.querySelector('.popup_type_edit-profile').classList.add('popup_active');
  document.querySelector('.popup__input_type_profile-name').value = document.querySelector('.profile__name').textContent;
  document.querySelector('.popup__input_type_profile-desc').value = document.querySelector('.profile__description').textContent;
}

function submitProfile (evt) {
  document.querySelector('.profile__name').textContent = evt.target.querySelector('#name').value;
  document.querySelector('.profile__description').textContent = evt.target.querySelector('#description').value;
  closePopup(evt);
  evt.preventDefault();
}

function submitPlace (evt) {
  addGalleryItem(evt.target.querySelector('#picture-name').value, evt.target.querySelector('#picture-address').value);
  closePopup(evt);
  evt.preventDefault();
}

function closePopup (evt) {
  evt.target.closest('.popup').classList.remove('popup_active');
  for (const elem of evt.target.closest('.popup').querySelectorAll('.popup__input')) {
    elem.value = '';
  }
}

function likeButton () {
  this.classList.toggle('gallery__like-button_like');
}

function deleteButton () {
  this.closest('.gallery__item').remove();
}

function addGalleryItem (title, source) {
  const galleryTemplate = document.querySelector('#gallery-item-template').content;
  const galleryItem = galleryTemplate.cloneNode(true);
  galleryItem.querySelector('.gallery__title').textContent = title;
  galleryItem.querySelector('.gallery__image').src = source;
  galleryItem.querySelector('.gallery__image').alt = title;
  galleryItem.querySelector('.gallery__like-button').addEventListener('click', likeButton);
  galleryItem.querySelector('.gallery__delete-button').addEventListener('click', deleteButton);
  document.querySelector('.gallery__list').prepend(galleryItem);
}
