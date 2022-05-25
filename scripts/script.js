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

const forms = document.forms;
const formEditProfile = document.forms.editProfile;
const formNewPlace = document.forms.newPlace;
const formNewPlaceNameInput = formNewPlace.elements.name;
const formNewPlaceAddrInput = formNewPlace.elements.address;
const formEditProfileNameInput = formEditProfile.elements.name;
const formEditProfileDescInput = formEditProfile.elements.description;

const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupNewPlace = document.querySelector('.popup_type_new-place');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
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
  formEditProfileNameInput.value = profileName.textContent;
  formEditProfileDescInput.value = profileDescription.textContent;
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
  profileName.textContent = formEditProfileNameInput.value;
  profileDescription.textContent = formEditProfileDescInput.value;
  closePopup();
  evt.preventDefault();
}

function submitPlace (evt) {
  galleryList.prepend(createGalleryItem(formNewPlaceNameInput.value, formNewPlaceAddrInput.value));
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

//Функция инициализации валидации форм
function enableValidation () {
  for (const form of forms) {
    validateForm(form);
  }
}

//Функция валидации формы
function validateForm (form) {
  form.setAttribute('novalidate', '');
  const inputs = Array.from(form.querySelectorAll('.popup__input'));
  const button = form.querySelector('.popup__button');
  form.addEventListener('input', (evt) => {
    const msgSpan = form.querySelector(`.${evt.target.name}-invalid`);
    validateInput(form, evt.target, msgSpan);
    validateButton(inputs, button);
  });
}

//Функция валидации инпута
function validateInput (form, input, msgSpan) {
  msgSpan.textContent = input.validationMessage;
  if (input.validity.valid) {
    input.classList.remove('popup__input_invalid');
    msgSpan.classList.remove('popup__invalid-msg_active');
  } else {
    input.classList.add('popup__input_invalid');
    msgSpan.classList.add('popup__invalid-msg_active');
  }
}

//Функция валидизации кнопки
function validateButton(inputs, button) {
  const invalid = inputs.some((input) => {
    return !input.validity.valid;
  });
  if (!invalid) {
    button.classList.remove('popup__button_disabled');
    button.removeAttribute('disabled');
  } else {
    button.classList.add('popup__button_disabled');
    button.setAttribute('disabled', '');
  }
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

//Включение валидизации инпута
enableValidation();
