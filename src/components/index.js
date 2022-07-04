import '../pages/index.css';

import { FormValidator, enableValidation } from './validate.js';
import { renderUserInfo } from './profile.js';
import { Card } from './cards.js';
import { formEditAvatar, formEditProfile, formNewPlace, galleryList, openPopupNewPlace, openPopupEditAvatar, openPopupEditProfile, submitProfile, submitPlace, closePopup, submitAvatar } from './modals.js';
import { getUserInfo, getInitialCards } from './api.js';

let userId;
const galleryItemTemplate = document.querySelector('#gallery-item-template');
const profileEditAvatar = document.querySelector('.profile__avatar-overlay');
const profileAddButton = document.querySelector('.profile__add');
const profileEditButton = document.querySelector('.profile__edit');
const popups = document.querySelectorAll('.popup');

const validationParameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorMessageClass: 'popup__invalid-msg_active'
};



profileAddButton.addEventListener('click', openPopupNewPlace);
profileEditAvatar.addEventListener('click', openPopupEditAvatar);
profileEditButton.addEventListener('click', openPopupEditProfile);
formEditAvatar.addEventListener('submit', submitAvatar);
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


//Включение валидации инпута
for (const form of document.forms) {
  const validator = new FormValidator(validationParameters, form);
  validator.enableValidation();
}
// enableValidation(validationParameters);

Promise.all([getUserInfo(), getInitialCards()])
  .then((data) => {
    renderUserInfo(data[0]);
    userId = data[0]._id;
    const initialCards = data[1];
    for (const elem of initialCards) {
        const card = new Card(elem.name, elem.link, elem.likes, elem._id, elem.owner._id, galleryItemTemplate);
        galleryList.append(card.createItem());
    }
  }).catch((err) => console.log(`Ошибка загрузки данных: ${err}`));

export { userId, validationParameters, galleryItemTemplate };
