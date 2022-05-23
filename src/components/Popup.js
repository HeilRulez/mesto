export default class Popup {
  constructor(selector) {
    this._modal = document.querySelector(selector);
    this._overlayVisible = 'overlay_visible';
  }

  open() {
    this._modal.classList.add(this._overlayVisible);
    this._setListenerEsc();
  }

  close() {
    this._modal.classList.remove(this._overlayVisible);
    this._deleteListenerEsc();
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _deleteListenerEsc() {
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _setListenerEsc() {
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleModalClose(evt) {
    if (evt.target.classList.contains(this._overlayVisible) || evt.target.classList.contains('modal-form__close')) {
      this.close();
    }
  }

  setEventListeners() {
    this._modal.addEventListener('mousedown', this._handleModalClose.bind(this));
  }

}
