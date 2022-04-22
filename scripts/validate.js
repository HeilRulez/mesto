const classCollection = {
  formSelector: '.form',
  inputSelector: 'input',
  submitButtonSelector: '.form__btn-submit',
  inactiveButtonClass: 'form__btn-submit_disabled',
  errorClass: '-error',
  inputStyleError: 'border-invalid',
};

const ERRORS = {
  valMis: "Вы пропустили это поле.",
  toLength: (min, max) => {
    return `Должно быть от ${min} до ${max} символов.`
  },
  typeMis: "Введите адрес сайта.",
};

function checkInputValidity(input) {
  input.setCustomValidity("");
  if (input.validity.valueMissing) {
    input.setCustomValidity(ERRORS.valMis);
  };
  if (input.validity.tooLong || input.validity.tooShort) {
    input.setCustomValidity(ERRORS.toLength(input.getAttribute("minlength"), input.getAttribute("maxlength")));
  };
  if (input.validity.typeMismatch && input.type === "url") {
    input.setCustomValidity(ERRORS.typeMis);
  };
}

function insertErrorText(input, obj) {
  const errorElement = input.parentNode.querySelector(`#${input.id}${obj.errorClass}`);
  checkInputValidity(input);
  errorElement.textContent = input.validationMessage;
}

function enableButton(button, obj) {
  button.disabled = false;
  button.classList.remove(obj.inactiveButtonClass);
}

function disableButton(button, obj) {
  button.disabled = true;
  button.classList.add(obj.inactiveButtonClass);
}

// Состояние кнопки
function setButtonState(button, obj) {
  const form = button.parentNode.checkValidity();
  if (form) {
    enableButton(button, obj);
  } else {
    disableButton(button, obj);
  };
}

function setInputStyleValid(input, obj) {
  input.classList.remove(obj.inputStyleError);
}

function setInputStyleInvalid(input, obj) {
  input.classList.add(obj.inputStyleError);
}

// Красное подчёркивание инпута
function setStyleInput(input, obj) {
  if (input.validity.valid) {
    setInputStyleValid(input, obj);
  } else {
    setInputStyleInvalid(input, obj);
  }
}

// Обработка при вводе в инпут
function trackInput(obj, inputsArr) {
  return function (evt) {
    const input = evt.target;
    const btnSubmit = evt.target.parentNode.querySelector(obj.submitButtonSelector);
    insertErrorText(input, obj);
    setButtonState(btnSubmit, obj);
    setStyleInput(input, obj);
  }
}

function validityForm(evt) {
  evt.preventDefault();
}

function setEventListeners(form, obj) {
  const inputsArr = Array.from(form.querySelectorAll(obj.inputSelector));
  inputsArr.forEach(input => input.addEventListener('input', trackInput(obj, inputsArr)));
}

function enableValidation(obj) {
  const forms = Array.from(document.querySelectorAll(obj.formSelector));
  forms.forEach(form => {
    form.addEventListener('submit', validityForm);
    setEventListeners(form, obj);
  });
}

enableValidation(classCollection);
