import Popup from "./Popup.js";

export default class PopupDel extends Popup {
    constructor(selector) {
        super(selector);
        this._form = this._modal.querySelector('.form');
    }

    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', this.close());
    }
}
