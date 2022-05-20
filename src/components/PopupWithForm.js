import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
    this._form = this._modal.querySelector('.form');
    this._iputData = {};
  }

  _getInputValues() {
    this._form.querySelectorAll('.form__input').forEach(input => {
      this._iputData[input.name] = input.value;
    });
  }

  close() {
    this._modal.classList.remove(this._overlayVisible);
    this._modal.reset();
    _deleteListenerEsc();
  }

  setEventListeners() {
    this._modal.addEventListener('mousedown', this._handleModalClose.bind(this));
    this._form.addEventListener('submit', this._submit(this._inputData));
  }
}
