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

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileAddButton = document.querySelector('.profile__add');
const profileEditButton = document.querySelector('.profile__edit');

const formEditProfile = document.forms.editProfile;
const formNewPlace = document.forms.newPlace;

const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupNewPlace = document.querySelector('.popup_type_new-place');
const popupNewPlaceNameInput = formNewPlace.elements.name;
const popupNewPlaceAddrInput = formNewPlace.elements.address;
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupEditProfileNameInput = formEditProfile.elements.name;
const popupEditProfileDescInput = formEditProfile.elements.description;
const popupShowImage = document.querySelector('.popup_type_show-image');
const popupShowImageImage = popupShowImage.querySelector('.popup__image');
const popupShowImageDesc = popupShowImage.querySelector('.popup__image-description');

const galleryList = document.querySelector('.gallery__list');



//Функции открытия попапов
function openPopupNewPlace () {
  formNewPlace.reset();
  openPopup(popupNewPlace);
}

function openPopupEditProfile () {
  popupEditProfileNameInput.value = profileName.textContent;
  popupEditProfileDescInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
}

function openPopupShowImage (title, source) {
  popupShowImageImage.src = source;
  popupShowImageImage.alt = title;
  popupShowImageDesc.textContent = title;
  openPopup(popupShowImage);
}

function openPopup (popup) {
  popup.classList.add('popup_active');
}

//Функции закрытия попапов
function submitProfile (evt) {
  profileName.textContent = popupEditProfileNameInput.value;
  profileDescription.textContent = popupEditProfileDescInput.value;
  closePopup();
  evt.preventDefault();
}

function submitPlace (evt) {
  galleryList.prepend(createGalleryItem(popupNewPlaceNameInput.value, popupNewPlaceAddrInput.value));
  closePopup();
  evt.preventDefault();
}

function closePopup () {
  const popup = document.querySelector('.popup_active')
  if (popup) popup.classList.remove('popup_active');
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
  galleryItemImage.addEventListener('click', () => openPopupShowImage(title, source));
  galleryItem.querySelector('.gallery__title').textContent = title;
  galleryItem.querySelector('.gallery__like-button').addEventListener('click', likeButton);
  galleryItem.querySelector('.gallery__delete-button').addEventListener('click', deleteButton);
  return galleryItem;
}



// Установка листенеров для существующих элементов
profileAddButton.addEventListener('click', openPopupNewPlace);
profileEditButton.addEventListener('click', openPopupEditProfile);
formEditProfile.addEventListener('submit', submitProfile);
formNewPlace.addEventListener('submit', submitPlace);
for (const butt of popupCloseButtons) {
  butt.addEventListener('click', closePopup);
}
for (const popup of popups) {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) closePopup();
  });
}
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') closePopup();
});

//Население галереи
for (const card of initialCards) {
  galleryList.append(createGalleryItem(card.name, card.link));
}
