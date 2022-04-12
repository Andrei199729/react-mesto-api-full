class Api {
  constructor({ address }) {
    this.address = address
    }

    _getResponseData(res) {
        return res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    getInitialCards() {
        return fetch(`${this.address}/cards`, {
          headers: this.getToken(),
        })
            .then(this._getResponseData);
    }

    getAboutUser() {
        return fetch(`${this.address}/users/me`, {
          headers: this.getToken()
        })
            .then(this._getResponseData)
    }

    editProfile(data) {
        return fetch(`${this.address}/users/me`, {
            method: 'PATCH',
          headers: this.getToken(),
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
          headers: this.getToken(),
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
          headers: this.getToken()
        })
            .then(this._getResponseData)
    }

    changeLikeCardStatus(dataId, isLiked) {
        const method = isLiked ? 'DELETE' : 'PUT';
        return fetch(`${this.address}/cards/${dataId}/likes`, {
            method,
          headers: this.getToken()
        })
            .then(this._getResponseData)
    }

    updateAvatar(data) {
        return fetch(`${this.address}/users/me/avatar`, {
            method: 'PATCH',
          headers: this.getToken(),
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._getResponseData)
    }

  getToken() {
    this._headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }
}

const api = new Api({
  address: 'https://api.arahalevich.nomoredomains.work',
});

export default api;