export default class Card {
  constructor(data, template) {
    this._template = template;
    this._cardData = data;
  }

  _createCard(cardData) {
    const cardCopy = document
      .querySelector(this._template)
      .content
      .querySelector('.card')
      .cloneNode(true);

    cardCopy.querySelector('.card__title').textContent = cardData.name;
    imgElement.src = cardData.link;
    imgElement.alt = cardData.name;
    this._setEventListeners(cardCopy);
    return cardCopy;
  }

  _setEventListeners(cardCopy) {
    const imgElement = cardCopy.querySelector('.card__img');
    imgElement.addEventListener('click', this._scaleImg(this._cardData));
    cardCopy.querySelector('.card__del').addEventListener('click', this._delCard);
    cardCopy.querySelector('.card__like').addEventListener('click', this._likeCard);
  }

  _delCard(evt) {
    evt.target.closest('.card').remove();
  }

  _likeCard(evt) {
    evt.target.classList.toggle("card__like_active");
  }

  _scaleImg(cardData) {
    // modalFormViewImg.src = cardData.link;
    // modalFormViewImg.alt = cardData.name;
    // modalFormTitleForView.textContent = cardData.name;
    // openModal(overlayForView);
  }

  getCard() {
    return this._createCard(this._cardData);
  }
}
