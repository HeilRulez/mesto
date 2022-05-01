export default class FormValidator {
  constructor(objectConfig, formTarget) {
    this._obj = objectConfig;
    this._form = formTarget;
    this._inputList = Array.from(this._form.querySelectorAll('input'));
  }

  _ERRORS = {
    valMis: "Вы пропустили это поле.",
    toLength: (min, max) => {
      return `Должно быть от ${min} до ${max} символов.`
    },
    typeMis: "Введите адрес сайта.",
  };

  _setInputStyleValid(input, obj) {
    input.classList.remove(obj.inputStyleError);
  }

  _setInputStyleInvalid(input, obj) {
    input.classList.add(obj.inputStyleError);
  }

  _setStyleInput(input, obj) {
    if (input.validity.valid) {
      this._setInputStyleValid(input, obj);
    } else {
      this._setInputStyleInvalid(input, obj);
    }
  }

  _enableButton(button, obj) {
    button.disabled = false;
    button.classList.remove(obj.inactiveButtonClass);
  }

  _disableButton(button, obj) {
    button.disabled = true;
    button.classList.add(obj.inactiveButtonClass);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _setButtonState(button, obj) {
    if (!this._hasInvalidInput()) {
      this._enableButton(button, obj);
    } else {
      this._disableButton(button, obj);
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

  _insertErrorText(input, obj) {
    const errorElement = input.parentNode.querySelector(`#${input.id}${obj.errorClass}`);
    this._checkInputValidity(input);
    errorElement.textContent = input.validationMessage;
  }

  _trackInput(obj) {
    return (evt) => {
      const input = evt.target;
      const btnSubmit = evt.target.parentNode.querySelector(obj.submitButtonSelector);
      this._insertErrorText(input, obj);
      this._setButtonState(btnSubmit, obj);
      this._setStyleInput(input, obj);
    }
  }
  _setEventListeners(form, obj) {
    const inputs = form.querySelectorAll(obj.inputSelector);
    inputs.forEach(input => input.addEventListener('input', this._trackInput(obj)));
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners(this._form, this._obj);
  }
}
