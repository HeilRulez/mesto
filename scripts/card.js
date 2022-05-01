export default class Card {
  constructor(data, handleCardClick, template) {
    this._cardData = data;
    this._handleCardClick = handleCardClick;
    this._template = template;
    this._cardCopy = document
      .querySelector(this._template)
      .content
      .querySelector('.card')
      .cloneNode(true);
    this._imgElement = this._cardCopy.querySelector('.card__img');
    this._cardDel = this._cardCopy.querySelector('.card__del');
    this._cardLike = this._cardCopy.querySelector('.card__like');
    this._cardTitle = this._cardCopy.querySelector('.card__title');
    this._modalFormViewImg = document.querySelector('.modal-form__view-img');
    this._modalFormTitleForView = document.querySelector('.modal-form__title_for_view');
  }


  _delCard(evt) {
    evt.target.closest('.card').remove();
  }

  _likeCard(evt) {
    evt.target.classList.toggle("card__like_active");
  }

  _setEventListeners() {
    this._imgElement.addEventListener('click', () => this._handleCardClick(this._cardData.name, this._cardData.link));
    this._cardDel.addEventListener('click', this._delCard);
    this._cardLike.addEventListener('click', this._likeCard);
  }

  _createCard() {
    this._cardTitle.textContent = this._cardData.name;
    this._imgElement.src = this._cardData.link;
    this._imgElement.alt = this._cardData.name;
    this._setEventListeners();
    return this._cardCopy;
  }

  getCard() {
    return this._createCard();
  }
}
