export default class Card {
  constructor(data, {handleCardClick, handleDelete, handleLike, template}, author) {
    this._cardData = data;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
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

  addLikeCard() {
    this._cardLike.classList.add("card__like_active");
  }

  delLikeCard() {
    this._cardLike.classList.remove("card__like_active");
  }

  _setEventListeners() {
    this._imgElement.addEventListener('click', () => this._handleCardClick(this._cardData.name, this._cardData.link));
    this._cardDel.addEventListener('click', (evt) => this._handleDelete(evt));
    this._cardLike.addEventListener('click', (evt) => this._handleLike(evt)(this));
  }

  countLiks(count) {
      this._cardCount.textContent = count;
  }

  containsLike() {
    this._cardData.likes.forEach(item => {
      if(item._id === this._author) {
        this.addLikeCard()
      }
    });
  }

  _createCard() {
    this._cardTitle.textContent = this._cardData.name;
    this._imgElement.src = this._cardData.link;
    this._imgElement.alt = this._cardData.name;
    this._cardCopy.id = this._cardData._id;
    this.countLiks(this._cardData.likes.length);
    this.containsLike();
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
