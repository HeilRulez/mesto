export default class FormValidator {
  constructor(objectConfig, formTarget) {
    this._obj = objectConfig;
    this._form = formTarget;
    this._btnSubmit = this._form.querySelector(this._obj.submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._obj.inputSelector));
    this._messagesError = Array.from(this._form.querySelectorAll(this._obj.errorClass));
  }

  _ERRORS = {
    valMis: "Вы пропустили это поле.",
    toLength: (min, max) => {
      return `Должно быть от ${min} до ${max} символов.`
    },
    typeMis: "Введите адрес сайта.",
  };

  _setInputStyleValid(input) {
    input.classList.remove(this._obj.inputStyleError);
  }

  _setInputStyleInvalid(input) {
    input.classList.add(this._obj.inputStyleError);
  }

  _setStyleInput(input) {
    if (input.validity.valid) {
      this._setInputStyleValid(input);
    } else {
      this._setInputStyleInvalid(input);
    }
  }

  _enableButton() {
    this._btnSubmit.disabled = false;
    this._btnSubmit.classList.remove(this._obj.inactiveButtonClass);
  }

  _disableButton() {
    this._btnSubmit.disabled = true;
    this._btnSubmit.classList.add(this._obj.inactiveButtonClass);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _setButtonState() {
    if (!this._hasInvalidInput()) {
      this._enableButton();
    } else {
      this._disableButton();
    };
  }

  _checkInputValidity(input) {
    input.setCustomValidity("");
    if (input.validity.valueMissing) {
      input.setCustomValidity(this._ERRORS.valMis);
    };
    if (input.validity.tooLong || input.validity.tooShort) {
      input.setCustomValidity(this._ERRORS.toLength(input.getAttribute("minlength"), input.getAttribute("maxlength")));
    };
    if (input.validity.typeMismatch && input.type === "url") {
      input.setCustomValidity(this._ERRORS.typeMis);
    };
  }

  _insertErrorText(input) {
    const errorElement = input.parentNode.querySelector(`#${input.id}${this._obj.errorId}`);
    this._checkInputValidity(input);
    errorElement.textContent = input.validationMessage;
  }

  _trackInput(evt) {
    const input = evt.target;
    this._insertErrorText(input);
    this._setButtonState();
    this._setStyleInput(input);
  }

  _setEventListeners() {
    this._inputList.forEach(input => input.addEventListener('input', (evt) => this._trackInput(evt)));
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners();
  }

  resetValidation() {
    this._messagesError.forEach(item => item.textContent = '');
    this._inputList.forEach(input => {
      this._checkInputValidity(input);
      if (input.classList.contains(this._obj.inputStyleError)) {
        input.classList.remove(this._obj.inputStyleError);
      }
    });
    this._setButtonState();
  }
}
