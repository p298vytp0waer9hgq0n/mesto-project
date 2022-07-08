import { Card } from "./cards.js";
import { api, validationParameters, galleryItemTemplate } from "./index.js";
import { renderUserInfo } from "./profile.js";

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const formEditAvatar = document.forms.editAvatar;
const formEditProfile = document.forms.editProfile;
const formNewPlace = document.forms.newPlace;

const formNewPlaceNameInput = formNewPlace.elements.name;
const formNewPlaceAddrInput = formNewPlace.elements.address;

const formEditAvatarAddrInput = formEditAvatar.elements.address;
const formEditProfileNameInput = formEditProfile.elements.name;
const formEditProfileDescInput = formEditProfile.elements.description;
const formEditProfileSubmitBtn = formEditProfile.elements.submit;

const popupNewPlace = document.querySelector('.popup_type_new-place');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupShowImage = document.querySelector('.popup_type_show-image');
const popupShowImageImage = popupShowImage.querySelector('.popup__image');
const popupShowImageDesc = popupShowImage.querySelector('.popup__image-description');

const galleryList = document.querySelector('.gallery__list');

//Функции открытия попапов
function openPopupNewPlace () {
  resetForm(formNewPlace);
  openPopup(popupNewPlace);
}

function openPopupEditAvatar () {
  resetForm(formEditAvatar);
  openPopup(popupEditAvatar);
}

function openPopupEditProfile () {
  resetForm(formEditProfile);
  formEditProfileNameInput.value = profileName.textContent;
  formEditProfileDescInput.value = profileDescription.textContent;
  formEditProfileSubmitBtn.classList.remove(validationParameters.inactiveButtonClass);
  formEditProfileSubmitBtn.removeAttribute('disabled', '');
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
  document.addEventListener('keydown', closeOnEsc);
}

//Функции закрытия попапов
function submitProfile (evt) {
  formEditProfileSubmitBtn.textContent = 'Сохранение...';
  api.updateUserInfo(formEditProfileNameInput.value, formEditProfileDescInput.value).then((data) => {;
    renderUserInfo(data);
    closePopup(popupEditProfile);
  }).catch((err) => {
    console.log(`Ошибка обновления профиля: ${err}`);
  }).finally(() => {
    formEditProfileSubmitBtn.textContent = 'Сохранить';
  });
  evt.preventDefault();
}

function submitAvatar (evt) {
  evt.target.submit.textContent = 'Сохранение...';
  api.updateUserAvatar(formEditAvatarAddrInput.value).then((data) => {
    renderUserInfo(data);
    closePopup(popupEditAvatar);
  }).catch((err) => {
    console.log(`Ошибка обновления аватара: ${err}`);
  }).finally(() => {
    evt.target.submit.textContent = 'Сохранить';
  });
  evt.preventDefault();
}

function submitPlace (evt) {
  evt.target.submit.textContent = 'Сохранение...';
  api.uploadCard(formNewPlaceNameInput.value, formNewPlaceAddrInput.value).then((data) => {
    const card = new Card(data.name, data.link, data.likes, data._id, data.owner._id, galleryItemTemplate);
    galleryList.prepend(card.createItem());
    closePopup(popupNewPlace);
  }).catch((err) => {
    console.log(`Ошибка при добавлении карточки: ${err}`);
  }).finally(() => {
    evt.target.submit.textContent = 'Создать';
  });
  evt.preventDefault();
}

function closePopup (popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closeOnEsc);
}

function resetForm (form) {
  form.reset();
  form.submit.classList.add(validationParameters.inactiveButtonClass);
  form.submit.setAttribute('disabled', '');
  // toggleSubmitBtn(false, form.submit, validationParameters);
  for (const element of form.children) {
    element.classList.remove(validationParameters.inputErrorClass);
    element.classList.remove(validationParameters.errorMessageClass);
  }
}

function closeOnEsc (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_active');
    closePopup(popup);
  }
}

export { formEditAvatar, formEditProfile, formNewPlace, galleryList, openPopupNewPlace, openPopupEditAvatar, openPopupEditProfile, openPopupShowImage, submitAvatar, submitProfile, submitPlace, closePopup };
