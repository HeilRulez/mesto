import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._modalFormViewImg = document.querySelector('.modal-form__view-img');
    this._modalFormTitleForView = document.querySelector('.modal-form__title_for_view');
  }

  open(name, link) {
    this._modal.classList.add(this._overlayVisible);
    this._modalFormViewImg.src = link;
    this._modalFormViewImg.alt = name;
    this._modalFormTitleForView.textContent = name;
  }
}
