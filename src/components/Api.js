export default class Api {
  constructor({baseUrl, token, type, cohort}) {
    this._baseUrl = baseUrl;
    this._token = token;
    this._type = type;
    this._cohort = cohort;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json()
    }else{
      return new Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  renderAllCards() {
    return fetch(`${this._baseUrl}${this._cohort}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._checkResponse(res))
  }

  setDataUser() {
    return fetch(`${this._baseUrl}${this._cohort}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._checkResponse(res))
  }

  reqDelCard(idCard) {
    return fetch(`${this._baseUrl}${this._cohort}/cards/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
  }

  getAllCards({
    name,
    link
  }) {
    return fetch(`${this._baseUrl}${this._cohort}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': this._type
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  handleLike(method, evt) {
    if (method === 'DELETE') {
      return fetch(`${this._baseUrl}${this._cohort}/cards/${evt.target.closest('.card').id}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this._token
        }
      })
    } else if (method === 'PUT') {
      return fetch(`${this._baseUrl}${this._cohort}/cards/${evt.target.closest('.card').id}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this._token
        }
      })
    }
  }

  sendData(name, about) {
    return fetch(`${this._baseUrl}${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': this._type
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  selectionAvatar(link) {
    return fetch(`${this._baseUrl}${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': this._type
      },
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => this._checkResponse(res))
  }

}
