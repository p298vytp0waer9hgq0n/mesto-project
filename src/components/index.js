import '../pages/index.css';

import { enableValidation } from './validate.js';
import { createGalleryItem } from './cards.js';
import { formEditProfile, formNewPlace, galleryList, openPopupNewPlace, openPopupEditProfile, submitProfile, submitPlace, closePopup } from './modals.js';


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

const profileAddButton = document.querySelector('.profile__add');
const profileEditButton = document.querySelector('.profile__edit');
const popups = document.querySelectorAll('.popup');

const validationParameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__invalid-msg_active'
};


profileAddButton.addEventListener('click', openPopupNewPlace);
profileEditButton.addEventListener('click', openPopupEditProfile);
formEditProfile.addEventListener('submit', submitProfile);
formNewPlace.addEventListener('submit', submitPlace);
for (const popup of popups) {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_active')) {
      closePopup(popup);
    } else if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
}

//Население галереи
for (const card of initialCards) {
  galleryList.append(createGalleryItem(card.name, card.link));
}

//Включение валидации инпута
enableValidation(validationParameters);

export { validationParameters };
