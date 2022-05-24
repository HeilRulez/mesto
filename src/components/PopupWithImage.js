import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._modalFormViewImg = this._modal.querySelector('.modal-form__view-img');
    this._modalFormTitleForView = this._modal.querySelector('.modal-form__title_for_view');
  }

  open(name, link) {
    super.open();
    this._modalFormViewImg.src = link;
    this._modalFormViewImg.alt = name;
    this._modalFormTitleForView.textContent = name;
  }

}
