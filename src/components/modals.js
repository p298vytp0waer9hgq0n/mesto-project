import { createGalleryItem } from "./cards.js";
import { toggleSubmitBtn } from "./validate.js";
import { validationParameters } from "./index.js";
import { updateUserAvatar, updateUserInfo, uploadCard } from "./api.js";
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
  toggleSubmitBtn(true, formEditProfileSubmitBtn, validationParameters);
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
  updateUserInfo(formEditProfileNameInput.value, formEditProfileDescInput.value).then((resp) => {;
    renderUserInfo();
    closePopup(popupEditProfile);
    formEditProfileSubmitBtn.textContent = 'Сохранить';
  }).catch((err) => {
    console.log(`Ошибка обновления профиля: ${err}`);
    closePopup(popupEditProfile);
    formEditProfileSubmitBtn.textContent = 'Сохранить';
  });
  evt.preventDefault();
}

function submitAvatar (evt) {
  updateUserAvatar(formEditAvatarAddrInput.value).then((resp) => {
    renderUserInfo();
    closePopup(popupEditAvatar);
  }).catch((err) => {
    console.log(`Ошибка обновления аватара: ${err}`);
    closePopup(popupEditAvatar);
  });
  evt.preventDefault();
}

function submitPlace (evt) {
  uploadCard(formNewPlaceNameInput.value, formNewPlaceAddrInput.value).then((data) => {
    galleryList.prepend(createGalleryItem(data.name, data.link, data._id, data.owner._id));
    closePopup(popupNewPlace);
  }).catch((err) => {
    console.log(`Ошибка при добавлении карточки: ${err}`);
    closePopup(popupNewPlace);
  });
  evt.preventDefault();
}

function closePopup (popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closeOnEsc);
}

function resetForm (form) {
  form.reset();
  toggleSubmitBtn(false, form.submit, validationParameters);
  for (const element of form.children) {
    element.classList.remove(validationParameters.inputErrorClass);
    element.classList.remove(validationParameters.errorClass);
  }
}

function closeOnEsc (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_active');
    closePopup(popup);
  }
}

export { formEditAvatar, formEditProfile, formNewPlace, galleryList, openPopupNewPlace, openPopupEditAvatar, openPopupEditProfile, openPopupShowImage, submitAvatar, submitProfile, submitPlace, closePopup };
