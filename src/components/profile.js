import { getUserInfo } from './api.js';

let profileData = {};
const profileAvatar = document.querySelector('.profile__avatar-img');
const profileName = document.querySelector('.profile__name');
const profileDescr = document.querySelector('.profile__description');

function downloadUserInfo () {
  return getUserInfo().then((data) => {
    renderUserInfo();
  }).catch((err) => console.log(`Ошибка обновления профиля: ${err}`));
}

function renderUserInfo () {
  profileAvatar.src = profileData.avatar;
  profileName.textContent = profileData.name;
  profileDescr.textContent = profileData.about;
}

export { profileData, profileAvatar, downloadUserInfo, renderUserInfo }
