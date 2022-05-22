import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
    this._form = this._modal.querySelector('.form');
  }

  _getInputValues() {
    const inputData = {};
    this._form.querySelectorAll('.form__input').forEach(input => {
      inputData[input.name] = input.value;
    });
    return inputData;
  }

  close() {
    this._modal.classList.remove(this._overlayVisible);
    this._form.reset();
    this._deleteListenerEsc();
  }

  setEventListeners() {
    this._modal.addEventListener('mousedown', this._handleModalClose.bind(this));
    this._form.addEventListener('submit', () => {
      this._submit(this._getInputValues());
      this.close();
    });
  }
}
