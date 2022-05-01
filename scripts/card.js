export default class Card {
  constructor(data, openModal, template) {
    this._template = template;
    this._cardData = data;
    this._openModal = openModal;
  }

  _createCard(cardData) {
    const cardCopy = document
      .querySelector(this._template)
      .content
      .querySelector('.card')
      .cloneNode(true);
    const imgElement = cardCopy.querySelector('.card__img');

    cardCopy.querySelector('.card__title').textContent = cardData.name;
    imgElement.src = cardData.link;
    imgElement.alt = cardData.name;
    this._setEventListeners(cardCopy, imgElement, cardData);
    return cardCopy;
  }

  _setEventListeners(cardCopy, imgElement, cardData) {
    imgElement.addEventListener('click', () => this._scaleImg(cardData));
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
    const overlayForView = document.querySelector('.overlay_for_view'),
          modalFormViewImg = document.querySelector('.modal-form__view-img'),
          modalFormTitleForView = document.querySelector('.modal-form__title_for_view');
    modalFormViewImg.src = this._cardData.link;
    modalFormViewImg.alt = this._cardData.name;
    modalFormTitleForView.textContent = this._cardData.name;
    this._openModal(overlayForView);
  }

  getCard() {
    return this._createCard(this._cardData, this._openModal);
  }
}
