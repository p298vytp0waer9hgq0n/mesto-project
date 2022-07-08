export class Api {
  constructor ({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResp (resp) {
    if (resp.ok) {
      return resp.json();
    } else {
      console.log('Ошибка связи с сервером');
      return Promise.reject(resp.status);
    }
  }

  getUserInfo () {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
      .then((resp) => this._handleResp(resp));
  }

  updateUserInfo (name, descr) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: descr
      })
    }).then((resp) => this._handleResp(resp));
  }

  updateUserAvatar (link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    }).then((resp) => this._handleResp(resp));
  }

  getInitialCards () {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then(resp => this._handleResp(resp));
  }

  uploadCard (name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then((resp) => this._handleResp(resp));
  }

  deleteCard (id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((resp) => this._handleResp(resp));
  }

  likeCard (id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: method,
      headers: this._headers
    }).then((resp) => this._handleResp(resp));
  }
}
