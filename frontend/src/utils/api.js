class Api {
  constructor({ address, headers }) {
        this.address = address;
    this.headers = headers;
    }

    _getResponseData(res) {
        return res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    getInitialCards() {
        return fetch(`${this.address}/cards`, {
            headers: {
                authorization: this.token
            }
        })
            .then(this._getResponseData);
    }

    getAboutUser() {
        return fetch(`${this.address}/users/me`, {
          headers: this.headers
        })
            .then(this._getResponseData)
    }

    editProfile(data) {
        return fetch(`${this.address}/users/me`, {
            method: 'PATCH',
          headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._getResponseData)
    }

    addCard(data) {
        return fetch(`${this.address}/cards`, {
            method: 'POST',
          headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._getResponseData)
    }

    deleteCard(dataId) {
        return fetch(`${this.address}/cards/${dataId}`, {
            method: 'DELETE',
          headers: this.headers
        })
            .then(this._getResponseData)
    }

    changeLikeCardStatus(dataId, isLiked) {
        const method = isLiked ? 'DELETE' : 'PUT';
        return fetch(`${this.address}/cards/${dataId}/likes`, {
            method,
          headers: this.headers
        })
            .then(this._getResponseData)
    }

    updateAvatar(data) {
        return fetch(`${this.address}/users/me/avatar`, {
            method: 'PATCH',
          headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._getResponseData)
    }
}

const api = new Api({
  //   address: 'https://mesto.nomoreparties.co/v1/cohort-32',
  // token: 'f0863dcb-641a-48c7-ae1b-e19e122bd627'
  address: 'https://api.arahalevich.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;