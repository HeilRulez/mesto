import Popup from "./Popup.js";

export default class PopupDel extends Popup {
    constructor(selector, submit) {
        super(selector);
        this._submit = submit;
        this._idCard = '';
    }

    open(card) {
      super.open();
      this._idCard = card._id;
    }

    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', () => {
        this._submit(this._idCard, this._btn);
      });
    }
}
