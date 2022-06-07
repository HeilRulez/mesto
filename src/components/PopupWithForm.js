import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
  }

  _getInputValues() {
    const inputData = {};
    this._form.querySelectorAll('.form__input').forEach(input => {
      inputData[input.name] = input.value;
    });
    inputData.btn = this._btn;
    return inputData;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._submit(this._getInputValues());
    });
  }
}
