import { profileData, renderUserInfo } from "./profile.js";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: 'b774376d-f39e-48ac-9645-fb307bb3995b',
    'Content-Type': 'application/json'
  }
}

function getUserInfo () {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        return Promise.reject(resp.status);
      }
    }).then((data) => {
      Object.assign(profileData, data);
    });
}

function updateUserInfo (name, descr) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: descr
    })
  }).then((resp) => resp.json()).then((data) => {
    Object.assign(profileData, data);
  });
}

function updateUserAvatar (link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  }).then((resp) => resp.json()).then((data) => {
    Object.assign(profileData, data);
  });
}

function getInitialCards () {
  return fetch(`${config.baseUrl}/cards`,  { headers: config.headers })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        return Promise.reject(resp.status);
      }
    });
}

function uploadCard (name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  }).then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      return Promise.reject(resp.status);
    }
  });
}

function deleteCard (id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  });
}

export { getUserInfo, updateUserAvatar, updateUserInfo, getInitialCards, uploadCard, deleteCard }
