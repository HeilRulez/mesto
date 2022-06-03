export default class Card {
  constructor(data, handleCardClick, handleDelete, template, author) {
    this._cardData = data;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._author = author;
    this._cardCopy = document
      .querySelector(template)
      .content
      .querySelector('.card')
      .cloneNode(true);
    this._imgElement = this._cardCopy.querySelector('.card__img');
    this._cardDel = this._cardCopy.querySelector('.card__del');
    this._cardLike = this._cardCopy.querySelector('.card__like');
    this._cardTitle = this._cardCopy.querySelector('.card__title');
    this._cardCount = this._cardCopy.querySelector('.card__like-count');
  }


  delCard(cardData) {
    // console.log(this._handleDelete);

    // evt.target.closest('.card').remove();
  }

  _likeCard(evt) {
    evt.target.classList.toggle("card__like_active");
  }

  _setEventListeners() {
    this._imgElement.addEventListener('click', () => this._handleCardClick(this._cardData.name, this._cardData.link));
    this._cardDel.addEventListener('click', () => this._handleDelete(this._cardData));
    this._cardLike.addEventListener('click', this._likeCard);
  }

  _createCard() {
    this._cardTitle.textContent = this._cardData.name;
    this._imgElement.src = this._cardData.link;
    this._imgElement.alt = this._cardData.name;
    this._cardCount.textContent = this._cardData.likes.length;
    this._setEventListeners();
    if(this._cardData.owner._id !== this._author) {
      this._cardDel.remove();
    }
    return this._cardCopy;
  }

  getCard() {
    return this._createCard();
  }
}
