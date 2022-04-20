
const classCollection = {
  formSelector: '.form',
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

function resetStyleInputError(target) {
  const allInputsInForm = Array.from(target.querySelectorAll('input'));
  allInputsInForm.forEach(input => {
    if (input.classList.contains(classCollection.inputStyleError)) {
      setInputStyleValid(input);
    }
  });
}

function insertErrorText(input) {
  console.log(input);
  const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
  checkInputValidity(input);
  errorElement.textContent = input.validationMessage;
}

function enableButton(button) {
  button.disabled = false;
  button.classList.remove(classCollection.inactiveButtonClass);
}

function disableButton(button) {
  button.disabled = true;
  button.classList.add(classCollection.inactiveButtonClass);
}

// Состояние кнопки
function setButtonState(button, isValid) {
  // Спасибо за коментари, но мне не понятно зачем делать дорогую
  // операцию по перебору (возможных) 100500 инпутов, если браузер
  // и так следит за ними и говорит, валидна ли вся форма.
  // Там более что результат так же будет взят за пределами этой функии.
  // Поясните пожулуйста, если ошибаюсь.
  if (isValid) {
    enableButton(button);
  } else {
    disableButton(button);
  };
}

function setInputStyleValid(input) {
  input.classList.remove(classCollection.inputStyleError);
}

function setInputStyleInvalid(input) {
  input.classList.add(classCollection.inputStyleError);
}

// Красное подчёркивание инпута
function setStyleInput(input) {
  if (input.checkValidity()) {
    setInputStyleValid(input);
  } else {
    setInputStyleInvalid(input);
  }
}

// Обработка при вводе в инпут
function trackInput(evt) {
  const formElement = evt.currentTarget;
  const input = evt.target;
  const btnSubmit = formElement.querySelector(classCollection.submitButtonSelector);
  insertErrorText(input);
  setButtonState(btnSubmit, formElement.checkValidity());
  setStyleInput(input);
}

function validityForm(evt) {
  evt.preventDefault();
}

function setEventListeners(form) {
  form.addEventListener('input', trackInput);
  form.addEventListener('submit', validityForm);
}


function enableValidation(obj) {
  const forms = Array.from(document.querySelectorAll(obj.formSelector));
  forms.forEach(form => setEventListeners(form));
}

enableValidation(classCollection);

