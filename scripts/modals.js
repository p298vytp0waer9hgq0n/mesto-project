import { createGalleryItem } from "./cards.js";
import { validationParameters } from "./index.js";

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// const forms = document.forms;
const formEditProfile = document.forms.editProfile;
const formNewPlace = document.forms.newPlace;

const formNewPlaceNameInput = formNewPlace.elements.name;
const formNewPlaceAddrInput = formNewPlace.elements.address;
const formNewPlaceSubmitBtn = formNewPlace.elements.submit;

const formEditProfileNameInput = formEditProfile.elements.name;
const formEditProfileDescInput = formEditProfile.elements.description;
const formEditProfileSubmitBtn = formEditProfile.elements.submit;

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
  closePopup();
  evt.preventDefault();
}

function submitPlace (evt) {
  galleryList.prepend(createGalleryItem(formNewPlaceNameInput.value, formNewPlaceAddrInput.value));
  closePopup();
  toggleSubmitBtn(false, formNewPlaceSubmitBtn, validationParameters);
  evt.preventDefault();
}

function closePopup () {
  const popup = document.querySelector('.popup_active')
  if (popup) {
    popup.classList.remove('popup_active');
    const form = popup.querySelector('.popup__form');
    if (form) resetForm(form);
    document.removeEventListener('keydown', closeOnEsc);
  }
}

function resetForm(form) {
  for (const element of form.children) {
    element.classList.remove(validationParameters.inputErrorClass);
    element.classList.remove(validationParameters.errorClass);
  }
}

//Функция переключения состояния кнопки
function toggleSubmitBtn (valid, button, param) {
  if (!valid) {
    button.classList.add(param.inactiveButtonClass);
    button.setAttribute('disabled', '');
  } else {
    button.classList.remove(param.inactiveButtonClass);
    button.removeAttribute('disabled');
  }
}

function closeOnEsc (evt) {
  if (evt.key === 'Escape') closePopup();
}

export { formEditProfile, formNewPlace, galleryList, openPopupNewPlace, openPopupEditProfile, openPopupShowImage, submitProfile, submitPlace, closePopup, toggleSubmitBtn };
