function openPopupNewPlace () {
  document.querySelector('.popup_type_new-place').classList.add('popup_active');
}

function openPopupEditProfile () {
  document.querySelector('.popup_type_edit-profile').classList.add('popup_active');
  document.querySelector('.popup__input_type_profile-name').value = document.querySelector('.profile__name').textContent;
  document.querySelector('.popup__input_type_profile-desc').value = document.querySelector('.profile__description').textContent;
}

function closePopup () {
  this.classList.remove('popup_active');
  for (elem of this.querySelectorAll('.popup__input')) {
    elem.value = '';
  }
}

document.querySelector('.profile__add').addEventListener('click', openPopupNewPlace);
document.querySelector('.popup__close_type_new-place').addEventListener('click', closePopup.bind(document.querySelector('.popup_type_new-place')));

document.querySelector('.profile__edit').addEventListener('click', openPopupEditProfile);
document.querySelector('.popup__close_type_edit-profile').addEventListener('click', closePopup.bind(document.querySelector('.popup_type_edit-profile')));
