export default class Api {
    constructor({token, cohort}) {
      this._token = token;
      this._cohort = cohort;
    }

// renderAllCards() {
// fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
//   headers: {
//     authorization: this._token
//   }
//   })
//   .then(res => {
//     if(res.ok) {
//       return res.json()
//     }else{
//       return new Promise.reject(`Ошибка: ${res.status}`);
//     }
//   })
//   .then(data => {return data})
//   .catch(err => console.error(`Ошибка ${err} при загрузке карточек.`));
// }

setDataUser() {
  return fetch(`https://mesto.nomoreparties.co/v1/cohort-42/users/me`, {
  headers: {
    authorization: this._token
  }
  })
  .then(res => {
    if(res.ok) {
      return res.json()
    }else{
      return new Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  .then(userData => {return userData})
  .catch(err => console.error(`Ошибка ${err} при загрузке данных профиля.`));
  }

  }







// const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
//   headers: {
//     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
//     'Content-Type': 'application/json'
//   }
// });






// Карточки должны отображаться на странице только после получения id пользователя.
