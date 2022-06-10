import { createGalleryItem } from "./cards.js";
import { toggleSubmitBtn } from "./validate.js";
import { validationParameters } from "./index.js";

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const formEditAvatar = document.forms.editAvatar;
const formEditProfile = document.forms.editProfile;
const formNewPlace = document.forms.newPlace;

const formNewPlaceNameInput = formNewPlace.elements.name;
const formNewPlaceAddrInput = formNewPlace.elements.address;

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
  profileName.textContent = formEditProfileNameInput.value;
  profileDescription.textContent = formEditProfileDescInput.value;
  closePopup(popupEditProfile);
  evt.preventDefault();
}

function submitPlace (evt) {
  galleryList.prepend(createGalleryItem(formNewPlaceNameInput.value, formNewPlaceAddrInput.value));
  closePopup(popupNewPlace);
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

export { formEditProfile, formNewPlace, galleryList, openPopupNewPlace, openPopupEditAvatar, openPopupEditProfile, openPopupShowImage, submitProfile, submitPlace, closePopup };
