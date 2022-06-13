const profileAvatar = document.querySelector('.profile__avatar-img');
const profileName = document.querySelector('.profile__name');
const profileDescr = document.querySelector('.profile__description');

function renderUserInfo (data) {
  profileAvatar.src = data.avatar;
  profileName.textContent = data.name;
  profileDescr.textContent = data.about;
}

export { renderUserInfo }
