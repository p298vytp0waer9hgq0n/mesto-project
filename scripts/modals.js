import { createGalleryItem } from "./gallery.js";

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const forms = document.forms;
const formEditProfile = document.forms.editProfile;
const formNewPlace = document.forms.newPlace;
const formNewPlaceNameInput = formNewPlace.elements.name;
const formNewPlaceAddrInput = formNewPlace.elements.address;
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
  toggleSubmitBtn(true, formEditProfileSubmitBtn);
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
  if (popup) {
    popup.classList.remove('popup_active');
    const form = popup.querySelector('.popup__form');
    if (form) resetForm(form);
  }
}

function resetForm(form) {
  for (const element of form.children) {
    console.log(form.children);
    element.classList.remove('popup__input_invalid');
    element.classList.remove('popup__invalid-msg_active');
  }
}

//Функции кнопочек
function toggleSubmitBtn (valid, button) {
  if (!valid) {
    button.classList.add('popup__button_disabled');
    button.setAttribute('disabled', '');
  } else {
    button.classList.remove('popup__button_disabled');
    button.removeAttribute('disabled');
  }
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
    validateInput(evt.target, msgSpan);
    validateButton(inputs, button);
  });
}

//Функция валидации инпута
function validateInput (input, msgSpan) {
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
  toggleSubmitBtn(!invalid, button);
}


export {formEditProfile, formNewPlace, galleryList, openPopupNewPlace, openPopupEditProfile, openPopupShowImage, submitProfile, submitPlace, closePopup, enableValidation};
