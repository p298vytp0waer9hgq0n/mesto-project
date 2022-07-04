const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: 'b774376d-f39e-48ac-9645-fb307bb3995b',
    'Content-Type': 'application/json'
  }
}

function handleResp (resp) {
  if (resp.ok) {
    return resp.json();
  } else {
    console.log('Ошибка связи с сервером');
    return Promise.reject(resp.status);
  }
}

function getUserInfo () {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
    .then(resp => handleResp(resp));
}

function updateUserInfo (name, descr) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: descr
    })
  }).then((resp) => handleResp(resp));
}

function updateUserAvatar (link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  }).then((resp) => handleResp(resp));
}

function getInitialCards () {
  return fetch(`${config.baseUrl}/cards`,  { headers: config.headers })
    .then(resp => handleResp(resp));
}

function uploadCard (name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  }).then((resp) => handleResp(resp));
}

function deleteCard (id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  }).then((resp) => handleResp(resp));
}

function likeCard (id, method) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: method,
    headers: config.headers
  }).then((resp) => handleResp(resp));
}

export { getUserInfo, updateUserAvatar, updateUserInfo, getInitialCards, uploadCard, deleteCard, likeCard }
