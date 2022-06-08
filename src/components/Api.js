export default class Api {
    constructor({baseUrl, token, type, cohort}) {
      this._baseUrl = baseUrl;
      this._token = token;
      this._type = type;
      this._cohort = cohort;
    }

renderAllCards() {
  return fetch(`${this._baseUrl}${this._cohort}/cards`, {
  headers: {
    authorization: this._token
  }
  })}

setDataUser() {
  return fetch(`${this._baseUrl}${this._cohort}/users/me`, {
  headers: {
    authorization: this._token
  }})}

}


// Карточки должны отображаться на странице только после получения id пользователя.
