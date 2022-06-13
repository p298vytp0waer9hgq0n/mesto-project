import { getUserInfo } from './api.js';

let profileData = {};
const profileAvatar = document.querySelector('.profile__avatar-img');
const profileName = document.querySelector('.profile__name');
const profileDescr = document.querySelector('.profile__description');

function downloadUserInfo () {
  return getUserInfo().then((data) => {
    renderUserInfo(data);
  }).catch((err) => console.log(`Ошибка обновления профиля: ${err}`));
}

function renderUserInfo (data) {
  profileAvatar.src = data.avatar;
  profileName.textContent = data.name;
  profileDescr.textContent = data.about;
}

export { profileData, profileAvatar, downloadUserInfo, renderUserInfo }
